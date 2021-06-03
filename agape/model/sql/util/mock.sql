DROP SCHEMA "mock" CASCADE;
CREATE SCHEMA IF NOT EXISTS "mock";

CREATE OR REPLACE VIEW "mock"."v_info_column" AS
SELECT
    "inf_col".*,
    CASE "inf_col"."udt_name"
    WHEN 'varchar' THEN
        format('util.random_sentence(%s)', "inf_col"."character_maximum_length")
    ELSE
        'util.random_between(1,100)'
    END AS "w_default"
FROM
    "information_schema"."columns" "inf_col";

/*
 *create a new function that generates table's mocks
 */
CREATE OR REPLACE PROCEDURE "mock"."init" (
    _table text,
    _schema text DEFAULT NULL,
    _add_to_name text DEFAULT NULL,
    _drop_columns text[] DEFAULT ARRAY[] ::text[],
    _debug boolean DEFAULT FALSE
)
    AS $$
DECLARE
    _name text;
    _sql text;
    _insert text := _table || '_insert';
    _update text := _table || '_update';
    _row record;
BEGIN
    IF _schema IS NULL THEN
        _schema = current_schema();
    END IF;
    IF _drop_columns IS NULL THEN
        _drop_columns = ARRAY[]::text[];
    END IF;
    IF _add_to_name IS NOT NULL THEN
        _name = _name || '_' || _add_to_name;
    END IF;
    EXECUTE format('DROP FUNCTION IF EXISTS "mock"."%s" ;DROP FUNCTION IF EXISTS "mock"."%s" ;', _insert, _update);

    /*
     *tamplate
     */
    _sql = $template$ 
        CREATE OR REPLACE FUNCTION "mock"."template" (
            _rows int DEFAULT 1
        )
                RETURNS json AS $mock$
        DECLARE
            /*replace here*/
            _variable text;
            _json json;
        BEGIN
            SELECT
                row_to_json("data".*) INTO _json
            FROM (
                SELECT
                    /*replace here*/
                    1 AS "column") "data";
            RETURN _json;
        END;
            $mock$
        LANGUAGE PLPGSQL
    $template$;

    /*
     *get metadata table
     */
    SELECT
        "data".* INTO _row
    FROM (
        SELECT
            string_agg(format('"%s" %s', "column_name", "udt_name"), ',') AS "columns",
            string_agg(format('(_mock_%s)::%s AS "%s"', "column_name", "udt_name", "column_name"), ',') AS "mocks",
            string_agg(format('_default_%s text := %s ', "column_name", quote_literal("w_default")), ';') || ';' AS "defaults"
        FROM
            "mock"."v_info_column"
        WHERE
            "table_name" = _table
            AND "table_schema" = _schema
            /*
             *filter columns with array input
             */
            AND "column_name" <> ALL (_drop_columns)) "data";
        IF _row IS NULL THEN
            RAISE EXCEPTION 'init_mock: fail load table "%" in schema "%"', _table, _schema;
            RETURN;
        END IF;

        /*
         *update template with metadata
         */
        _sql = replace(_sql, 'variable text;', _row.defaults);
        _sql = replace(_sql, '1 AS "column"', _row.mocks);
        _insert = replace(_sql, 'template', quote_ident(_insert));
        _update = replace(_sql, 'template', quote_ident(_update));
        _sql = format('%s ; %s', _insert, _update);

        /*
         *debug
         */
        IF _debug THEN
            --RAISE NOTICE '%', _row;
            RAISE NOTICE '%', _sql;
        END IF;
        --minifity
        -- _sql = regexp_replace(_sql, '\n', ' ', 'g');
        -- _sql = regexp_replace(_sql, '( )\1{1,}', ' ', 'g');
        EXECUTE _sql;
END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE PROCEDURE "mock"."set" (
    _name text,
    _column text,
    _value text DEFAULT NULL,
    _debug boolean DEFAULT FALSE
)
    AS $$
DECLARE
    _sql text;
    _insert text;
    _update text;
    _regexp_default text := replace('(?<=_default_column text := `).+?(?=`;)', chr(96), chr(39));
    _default text;
BEGIN
    _insert = _name || '_insert';
    _update = _name || '_update';

    /*
     *get function definition, use as template
     *https://stackoverflow.com/questions/12148914/get-definition-of-function-sequence-type-etc-in-postgresql-with-sql-query
     */
    SELECT
        pg_get_functiondef(oid) INTO _insert
    FROM
        pg_proc
    WHERE
        proname = _insert;
    SELECT
        pg_get_functiondef(oid) INTO _update
    FROM
        pg_proc
    WHERE
        proname = _update;

    /*
     *throw error not found data
     */
    IF _insert IS NULL AND _update IS NULL THEN
        RAISE EXCEPTION 'fail set mock with name "mock"."%"', _insert;
    END IF;

    /*
     *extract default and use default
     */
    IF _value IS NULL THEN
        _regexp_default = replace(_regexp_default, 'column', _column);
        _value = substring(_insert FROM _regexp_default);
    END IF;

    /*
     *update template
     */
    _insert = replace(_insert, '_mock_' || _column, _value);
    _update = replace(_update, '_mock_' || _column, util.maybe_null (_value));
    _sql = format('%s ; %s', _insert, _update);
    --minifity
    -- _sql = regexp_replace(_sql, '\n', ' ', 'g');
    -- _sql = regexp_replace(_sql, '( )\1{1,}', ' ', 'g');
    /*
     *debug
     */
    IF _debug THEN
        RAISE NOTICE '%', _sql;
    END IF;

    /*
     *setting function mock
     */
    EXECUTE _sql;
END;
$$
LANGUAGE PLPGSQL;