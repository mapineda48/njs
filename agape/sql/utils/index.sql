
CREATE SCHEMA IF NOT EXISTS "util";

CREATE OR REPLACE FUNCTION util.random_timestamp ()
    RETURNS timestamp
    AS $$
DECLARE
    _result timestamp;
    _query text;
BEGIN
    --random days
    _query = format('SELECT NOW()::date + integer %s', quote_literal(floor(random() * (365 - 2 + 2) + 1)::int));
    --random hours
    _query = _query || format(' + interval %s', quote_literal(floor(random() * (365 - 2 + 2) + 1)::int || ' hour'));
    --random mins
    _query = _query || format(' + interval %s', quote_literal(floor(random() * (365 - 2 + 2) + 1)::int || ' min'));
    --random secs
    _query = _query || format(' + interval %s', quote_literal(floor(random() * (365 - 2 + 2) + 1)::int || ' sec'));
    --RAISE NOTICE '%', _query;
    EXECUTE _query INTO _result;
    RETURN _result;
END;
$$
LANGUAGE PLPGSQL;


/*
 * https://dba.stackexchange.com/questions/122742/how-to-drop-all-of-my-functions-in-postgresql
 */
CREATE PROCEDURE util.drop_all_function (
    _schema text
)
LANGUAGE plpgsql
AS $$
DECLARE
    _sql text;
BEGIN
    SELECT
        INTO _sql string_agg(format('DROP %s %s;', CASE prokind
                WHEN 'f' THEN
                    'FUNCTION'
                WHEN 'a' THEN
                    'AGGREGATE'
                WHEN 'p' THEN
                    'PROCEDURE'
                WHEN 'w' THEN
                    'FUNCTION' -- window function (rarely applicable)
                    -- ELSE NULL              -- not possible in pg 11
                END, oid::regprocedure), E'\n')
    FROM
        pg_proc
    WHERE
        pronamespace = _schema::regnamespace -- schema name here!
        -- AND    prokind = ANY ('{f,a,p,w}')         -- optionally only selected kinds
;
    IF _sql IS NOT NULL THEN
        --RAISE NOTICE '%', _sql;
        -- debug / check first
        EXECUTE _sql;
        -- uncomment payload once you are sure
    ELSE
        RAISE NOTICE 'No fuctions found in schema %', quote_ident(_schema);
    END IF;
    COMMIT;
END;
$$;


/*
 * Random Words
 */
CREATE FUNCTION util.random_word (
    _low_number_syllables integer DEFAULT 2,
    _high_number_syllables integer DEFAULT 3
)
    RETURNS text
    AS $$
DECLARE
    _vocal_arr varchar[] := '{a,e,i,o,u}';
    _consonat_arr varchar[] := '{b,d,f,g,h,j,k,l,m,n,ñ,p,q,r,s,t,v,x,y,z}';
    _word varchar;
BEGIN
    _word = '';
    FOR counter IN 1..floor(random() * (_high_number_syllables - _low_number_syllables + 1) + _low_number_syllables)
    LOOP
        _word = _word || _consonat_arr[floor(random() * 20 + 1)] || _vocal_arr[floor(random() * 5 + 1)];
    END LOOP;
    RETURN _word;
END;
$$
LANGUAGE PLPGSQL;


/*
 * Random Words
 */
CREATE FUNCTION util.random_sentence (
    n_max_char_sentence integer DEFAULT 250,
    n_word integer DEFAULT 20
)
    RETURNS text
    AS $$
DECLARE
    _low_number_syllables integer;
    _high_number_syllables integer;
    _word varchar;
    _sentence varchar;
    _n_char_word integer;
    _n_char_sentence integer;
BEGIN
    /*
     * Init varialble
     */
    _sentence = '';
    FOR counter IN 1..n_word LOOP
        /*
         * Random number syllables
         */
        _low_number_syllables = floor(random() * (3 - 2 + 1) + 2);
        _high_number_syllables = floor(random() * (4 - 3 + 1) + 3);

        /*
         * Random Words
         */
        _word = util.random_word (_low_number_syllables, _high_number_syllables);

        /*
         * number chars
         */
        _n_char_word = char_length(_word);
        _n_char_sentence = char_length(_sentence);

        /*
         * Prevent Exception
         */
        IF _n_char_word + _n_char_sentence + 1 > n_max_char_sentence THEN
            EXIT;
        END IF;

        /*
         * Add Word to Sentence
         */
        _sentence = _sentence || ' ' || _word;
    END LOOP;
    RETURN _sentence;
END;
$$
LANGUAGE PLPGSQL;


/*
 * Random Words
 */
CREATE FUNCTION util.random_between (
    _min integer,
    _max integer
)
    RETURNS integer
    AS $$
DECLARE
BEGIN
    RETURN floor(random() * (_max - _min + _min) + 1)::int;
END;
$$
LANGUAGE PLPGSQL;


/*
 * Random Addres
 */
CREATE FUNCTION util.random_addres ()
    RETURNS text
    AS $$
BEGIN
    RETURN 'Av. ' || floor(RANDOM() * 10 + 1) || ' N. ' || floor(RANDOM() * 10 + 1) || ' - ' || floor(RANDOM() * 10 + 1) || ' ' || util.random_word () || ' ' || util.random_word (1,
    2) || ' ' || util.random_word ();
END;
$$
LANGUAGE PLPGSQL;


/*
 * Random Email
 */
CREATE FUNCTION util.random_email (
    first_word varchar,
    second_word varchar
)
    RETURNS text
    AS $$
BEGIN
    RETURN replace(first_word || second_word, ' ', '') || '@' || (
        CASE (RANDOM() * 2)::INT
        WHEN 0 THEN
            'gmail'
        WHEN 1 THEN
            'hotmail'
        WHEN 2 THEN
            'yahoo'
        END) || '.com';
END;
$$
LANGUAGE PLPGSQL;


/*
 * Select random column in table
 */
CREATE FUNCTION util.random_from (
    _table text,
    _schema text,
    _column text
)
    RETURNS text
    AS $$
DECLARE
    _sql text;
BEGIN
    IF _schema IS NULL THEN
        _schema = current_schema();
    END IF;
    _sql = $template$
    SELECT
        /*here*/
        "column"
    FROM
        /*here*/
        "schema"."table" OFFSET floor(random() * (
        SELECT
            count(*)
        /*here*/
        FROM "schema"."table"))
    LIMIT 1 $template$;

    /*
     * update template with data
     */
    _sql = replace(_sql, 'schema', _schema);
    _sql = replace(_sql, 'table', _table);
    _sql = replace(_sql, 'column', _column);
    RETURN _sql;
END;
$$
LANGUAGE PLPGSQL;


/*
 * http://www.postgresonline.com/journal/archives/170-Of-Camels-and-People-Converting-back-and-forth-from-Camel-Case,-Pascal-Case-to-underscore-lower-case.html
 */
CREATE FUNCTION util.lower_case_to_camelCase (
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


/*
 * maybe null
 */
CREATE FUNCTION util.maybe_null (
    _subquery text
)
    RETURNS text
    AS $$
DECLARE
    _sql text;
BEGIN
    /*
     * select sql template from table and update with input data
     */
    _sql = $template$
    SELECT
        CASE floor(random() * (2 - 1 + 1) + 1)::int
        WHEN 1 THEN
            /*here*/
            (_subquery)
        ELSE
            NULL
        END $template$;

    /*
     * return query
     */
    RETURN replace(_sql,'_subquery',_subquery);
END;
$$
LANGUAGE PLPGSQL;

