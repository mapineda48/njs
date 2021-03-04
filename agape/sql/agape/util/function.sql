/*
 * http://www.postgresonline.com/journal/archives/170-Of-Camels-and-People-Converting-back-and-forth-from-Camel-Case,-Pascal-Case-to-underscore-lower-case.html
 * use psql -U postgres --quiet -f src/agape/model.sql -f src/agape/util/view.sql -o src/agape/view.sql -c "drop schema agape cascade;"
 */
CREATE OR REPLACE FUNCTION "pg_temp"."to_camelCase" (
    _text text
)
    RETURNS text
    AS $$
DECLARE
    _pascal_case text := replace(initcap(replace(_text, '_', ' ')), ' ', '');
BEGIN
    RETURN lower(substring(_pascal_case, 1, 1)) || substring(_pascal_case, 2);
END;
$$
LANGUAGE PLPGSQL;

CREATE TABLE "pg_temp"."table_in_agape" ( "table_name" information_schema.sql_identifier, "column_name" information_schema.sql_identifier, "udt_name" information_schema.sql_identifier, "ordinal_position" information_schema.cardinal_number, "column_default" information_schema.character_data
);

INSERT INTO "pg_temp"."table_in_agape"
SELECT
    "table_name",
    "column_name",
    "udt_name",
    "ordinal_position",
    "column_default"
FROM
    "information_schema"."columns"
WHERE
    "table_schema" = 'agape';

CREATE OR REPLACE FUNCTION "pg_temp"."generate_select_insert" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
BEGIN
    _table = format('v_%s', _table);
    SELECT
        format('FROM (SELECT %s FROM (SELECT _json_input AS "json") "input") "%s"', string_agg(format('("input"."json" ->> %s)::%s %s', quote_literal("column_name"), "udt_name", format('AS "%s"', lower(regexp_replace("column_name", E'([A-Z])', E'\_\\1', 'g')))), ','), replace("table_name", 'v_', '')) INTO _result
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = _table
    GROUP BY
        "table_name";
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."generate_function_insert" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
    _return text;
    _pKey record;
    _row record;
BEGIN
    SELECT
        "pipe".* INTO _row
    FROM (
        SELECT
            "table_name",
            format('INSERT INTO "agape"."%s"(%s) SELECT %s %s', "table_name", string_agg(format('"%s"', "column_name"), ','), string_agg(format('"%s"."%s"', "table_name", "column_name"), ','), "pg_temp"."generate_select_insert" (_table)) AS "insert"
        FROM
            "pg_temp"."table_in_agape"
        WHERE
            "table_name" = _table
            AND NOT ("ordinal_position" = 1
                AND "column_default" IS NOT NULL)
        GROUP BY
            "table_name") "pipe";
    SELECT
        * INTO _pKey
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = _table
        AND "ordinal_position" = 1;
    _result = format('CREATE OR REPLACE FUNCTION "agape"."f_insert_%s"( _json_input jsonb )', _row.table_name);
    _result = _result || format(' RETURNS SETOF "agape"."v_%s" LANGUAGE plpgsql AS $$ ', _row.table_name);
    _result = _result || format('DECLARE _%s %s; ', _pKey.column_name, _pKey.udt_name);
    _result = _result || format('BEGIN %s %s RETURN QUERY END; $$;', _row.insert, format('RETURNING %s INTO _%s;', _pKey.column_name, _pKey.column_name));
    _result = replace(_result, 'QUERY', format('QUERY SELECT * FROM "agape"."v_%s" WHERE "%s" = _%s;', _table, _pKey.column_name, _pKey.column_name));
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."destructure_json" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
BEGIN
    _table = format('v_%s', _table);
    SELECT
        string_agg(format('_%s %s := (_json_input ->> %s);', lower(regexp_replace("column_name", E'([A-Z])', E'\_\\1', 'g')), "udt_name", quote_literal("column_name")), '') || '_arr_columns text[]; _columns text;' INTO _result
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = "_table";
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."generate_appends" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
BEGIN
    SELECT
        string_agg(format('_arr_columns = array_append(_arr_columns,%s || %s || %s);', quote_literal(format('"%s" = ', "column_name")), CASE "udt_name"
                WHEN 'varchar' THEN
                    format('quote_literal(_%s)', "column_name")
                WHEN 'date' THEN
                    format('quote_literal(_%s)', "column_name")
                ELSE
                    format('_%s', "column_name")
                END, quote_literal(format('::%s', "udt_name"))), '') INTO _result
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = _table;
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."generate_execute" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
    _pKey text;
BEGIN
    SELECT
        "column_name" INTO _pKey
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = _table
        AND "ordinal_position" = 1;
    _result = 'SELECT string_agg("values", `,`) INTO _columns ';
    _result = _result || 'FROM ( SELECT unnest(_arr_columns) AS "values") "data" ';
    _result = _result || 'WHERE "values" IS NOT NULL; ';
    _result = _result || 'EXECUTE format(`UPDATE "agape"."table" SET %s WHERE "pk" = %s RETURNING "pk"`,_columns, _where_pk) ';
    _result = _result || 'INTO _where_pk;';
    _result = replace(_result, chr(96), chr(39));
    _result = replace(_result, 'table', _table);
    _result = replace(_result, 'pk', _pKey);
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."generate_function_update" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
    _body text;
    _pKey record;
BEGIN
    SELECT
        * INTO _pKey
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = _table
        AND "ordinal_position" = 1;
    _body = pg_temp.generate_appends (_table) || ' ' || pg_temp.generate_execute (_table);
    _body = _body || format('RETURN QUERY SELECT * FROM "agape"."v_%s" WHERE "%s" = _where_%s; ', _table, _pKey.column_name, _pKey.column_name);
    _result = format('CREATE OR REPLACE FUNCTION "agape"."f_update_%s"', _table);
    _result = _result || format('( _where_%s %s, _json_input jsonb ) ', _pKey.column_name, _pKey.udt_name);
    _result = _result || format('RETURNS SETOF "agape"."v_%s" ', _table);
    _result = _result || format('LANGUAGE plpgsql AS $$ DECLARE %s', "pg_temp"."destructure_json" (_table));
    _result = _result || format(' BEGIN %s  END; $$;', _body);
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."generate_function_delete" (
    _table text
)
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _result text;
    _body text;
    _pKey record;
BEGIN
    SELECT
        * INTO _pKey
    FROM
        "pg_temp"."table_in_agape"
    WHERE
        "table_name" = _table
        AND "ordinal_position" = 1;
    _body = format('SELECT * INTO _row FROM "agape"."v_%s" WHERE "%s" = _where_%s;', _table, _pKey.column_name, _pKey.column_name);
    _body = _body || format(' DELETE FROM "agape"."%s" WHERE "%s" = _where_%s;', _table, _pKey.column_name, _pKey.column_name);
    _body = _body || ' RETURN QUERY SELECT (_row).*;';
    _result = format('CREATE OR REPLACE FUNCTION "agape"."f_delete_%s"', _table);
    _result = _result || format('( _where_%s %s ) ', _pKey.column_name, _pKey.udt_name);
    _result = _result || format('RETURNS SETOF "agape"."v_%s" ', _table);
    _result = _result || format('LANGUAGE plpgsql AS $$ DECLARE _row "agape"."v_%s";', _table);
    _result = _result || format(' BEGIN %s  END; $$;', _body);
    RETURN _result;
END;
$template$;

CREATE OR REPLACE FUNCTION "pg_temp"."generate_functions" ()
    RETURNS text
    LANGUAGE PLPGSQL
    AS $template$
DECLARE
    _file text;
BEGIN
    SELECT
        string_agg("insert" || "update" || "delete", '') INTO _file
    FROM (
        SELECT
            pg_temp.generate_function_insert ("table_name") AS "insert",
            pg_temp.generate_function_update ("table_name") AS "update",
            pg_temp.generate_function_delete ("table_name") AS
            "delete"
        FROM
            "pg_temp"."table_in_agape"
        WHERE
            "table_name" !~ 'v_'
        GROUP BY
            "table_name") "data";
    RETURN _file;
END;
$template$;

COPY (
    SELECT
        "pg_temp"."generate_functions" ())
TO STDOUT;

