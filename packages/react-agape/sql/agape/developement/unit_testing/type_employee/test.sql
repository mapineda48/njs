DELETE FROM "agape"."type_employee";

SELECT
    *,
    'insert' AS "dml"
FROM
    "agape"."f_insert_type_employee" ('{"fullName":"premium"}'::jsonb);

SELECT
    *,
    'insert' AS "dml"
FROM
    "agape"."f_insert_type_employee" ('{"fullName":"standar"}'::jsonb);

SELECT
    ("agape"."f_update_type_employee" ("data"."id", '{"fullName":"developer"}'::jsonb)).*,
    'update' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "type_employee" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "type_employee"))
    LIMIT 1) AS "data";

-- SELECT
--     ("agape"."f_delete_type_employee" ("data"."id")).*,
--     'delete' AS "dml"
-- FROM (
--     SELECT
--         "id"
--     FROM
--         "type_employee" OFFSET floor(random() * (
--             SELECT
--                 count(*)
--                 FROM "type_employee"))
--     LIMIT 1) AS "data";

SELECT
    *
FROM
    "v_type_employee";

