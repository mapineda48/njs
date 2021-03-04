/*
 * http://www.postgresonline.com/journal/archives/170-Of-Camels-and-People-Converting-back-and-forth-from-Camel-Case,-Pascal-Case-to-underscore-lower-case.html
 * use psql -U postgres --quiet -f src/agape/model.sql -f src/agape/util/view.sql -o src/agape/view.sql -c "drop schema agape cascade;"
 */
CREATE FUNCTION pg_temp.to_camelCase (
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

SELECT
    string_agg("generator"."sql", '') AS "file"
FROM (
    SELECT
        (
            SELECT
                format('CREATE OR REPLACE VIEW "%s"."v_%s" AS SELECT %s FROM "%s"."%s" "%s";', "table_schema", "table_name", "columns", "table_schema", "table_name", "table_name") AS "dml"
            FROM (
                SELECT
                    "table_schema",
                    "table_name",
                    string_agg("lvl_1"."camel_case", ',') AS "columns"
                FROM (
                    SELECT
                        "table_schema",
                        "table_name",
                        CASE "column_name" ~ '_'
                        WHEN TRUE THEN
                            format('"%s"."%s" AS "%s"', "table_name", "column_name", pg_temp.to_camelCase ("column_name"))
                        ELSE
                            format('"%s"."%s"', "table_name", "column_name")
                        END AS "camel_case"
                    FROM
                        "information_schema"."columns"
                    WHERE
                        "table_schema" = 'agape'
                        AND "table_name" = "main"."table_name") "lvl_1"
                GROUP BY
                    "table_schema",
                    "table_name") "lvl_2") AS "sql"
        FROM (
            SELECT
                "table_name"
            FROM
                "information_schema"."columns"
            WHERE
                "table_schema" = 'agape'
            GROUP BY
                "table_name") "main") "generator";

