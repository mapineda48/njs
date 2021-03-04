DELETE FROM "type_client";
DELETE FROM "agape"."type_client";

SELECT
    *,
    'insert' AS "dml"
FROM
    "agape"."f_insert_type_client" ('{"fullName":"admin"}'::jsonb);

SELECT
    *,
    'insert' AS "dml"
FROM
    "agape"."f_insert_type_client" ('{"fullName":"standar"}'::jsonb);

SELECT
    ("agape"."f_update_type_client" ("data"."id", '{"fullName":"developer"}'::jsonb)).*,
    'update' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "type_client" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "type_client"))
    LIMIT 1) AS "data";

-- SELECT
--     ("agape"."f_delete_type_client" ("data"."id")).*,
--     'delete' AS "dml"
-- FROM (
--     SELECT
--         "id"
--     FROM
--         "type_client" OFFSET floor(random() * (
--             SELECT
--                 count(*)
--                 FROM "type_client"))
--     LIMIT 1) AS "data";

SELECT
    *
FROM
    "v_type_client";

