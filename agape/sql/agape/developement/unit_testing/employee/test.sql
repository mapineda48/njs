CALL "mock"."init" ('v_employee','agape',NULL, ARRAY['id']::text[]);

CALL "mock"."set" ('v_employee', 'dni', 'util.random_between(1000000000,1999999999)');

CALL "mock"."set" ('v_employee', 'firstName', 'util.random_sentence(15)');

CALL "mock"."set" ('v_employee', 'lastName', 'util.random_sentence(15)');

CALL "mock"."set" ('v_employee', 'phone', 'util.random_sentence(15)');

CALL "mock"."set" ('v_employee', 'email', 'util.random_email(util.random_sentence(10),util.random_sentence(10))');

CALL "mock"."set" ('v_employee', 'addres', 'util.random_addres ()');

CALL "mock"."set" ('v_employee', 'type', util.random_from ('type_employee', current_schema(), 'full_name'));

CALL "mock"."set" ('v_employee', 'username', 'util.random_sentence(15)');

CALL "mock"."set" ('v_employee', 'password', 'util.random_sentence(15)');

DELETE FROM "employee";

SELECT
    ("agape"."f_insert_employee" ("mock"."v_employee_insert" ()::jsonb)).*,
    'insert' AS "dml"
FROM
    generate_series(1, 5);

SELECT
    "id" AS "target",
    ("agape"."f_update_employee" ("data"."id", "mock")).*,
    'update' AS "dml",
    "mock"
FROM (
    SELECT
        "id",
        "mock"."v_employee_update" ()::jsonb as "mock"
    FROM
        "employee" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "employee"))
    LIMIT 1) AS "data";

SELECT
    ("agape"."f_delete_employee" ("data"."id")).*,
    'delete' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "employee" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "employee"))
    LIMIT 1) AS "data";

-- SELECT
--     *
-- FROM
--     "v_employee";

