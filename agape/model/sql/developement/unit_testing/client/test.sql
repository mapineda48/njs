CALL "mock"."init" ('v_client','agape',NULL,ARRAY['id']::text[]);

CALL "mock"."set" ('v_client', 'dni', 'util.random_between(1000000000,1999999999)');

CALL "mock"."set" ('v_client', 'firstName', 'util.random_sentence(15)');

CALL "mock"."set" ('v_client', 'lastName', 'util.random_sentence(15)');

CALL "mock"."set" ('v_client', 'phone', 'util.random_sentence(15)');

CALL "mock"."set" ('v_client', 'email', 'util.random_email(util.random_sentence(10),util.random_sentence(10))');

CALL "mock"."set" ('v_client', 'addres', 'util.random_addres ()');

CALL "mock"."set" ('v_client', 'type', util.random_from ('type_client', current_schema(), 'full_name'));

DELETE FROM "client";

SELECT
    ("agape"."f_insert_client" ("mock"."v_client_insert" ()::jsonb)).*,
    'insert' AS "dml"
FROM
    generate_series(1, 5);

SELECT
    "id" AS "target",
    ("agape"."f_update_client" ("data"."id", "mock")).*,
    'update' AS "dml",
    "mock"
FROM (
    SELECT
        "id",
        "mock"."v_client_update" ()::jsonb as "mock"
    FROM
        "agape"."client" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "agape"."client"))
    LIMIT 1) AS "data";

SELECT
    ("agape"."f_delete_client" ("data"."id")).*,
    'delete' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "agape"."client" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "agape"."client"))
    LIMIT 1) AS "data";

-- SELECT
--     *
-- FROM
--     "v_client";

