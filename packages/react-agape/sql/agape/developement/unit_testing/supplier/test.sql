
CALL "mock"."init" ('v_supplier','agape',NULL,ARRAY['id']::text[]);

CALL "mock"."set" ('v_supplier', 'dni', 'util.random_between(1000000000,1999999999)');

CALL "mock"."set" ('v_supplier', 'firstName', 'util.random_sentence(15)');

CALL "mock"."set" ('v_supplier', 'lastName', 'util.random_sentence(15)');

CALL "mock"."set" ('v_supplier', 'phone', 'util.random_sentence(15)');

CALL "mock"."set" ('v_supplier', 'email', 'util.random_email(util.random_sentence(10),util.random_sentence(10))');

CALL "mock"."set" ('v_supplier', 'addres', 'util.random_addres ()');

CALL "mock"."set" ('v_supplier', 'company', 'util.random_sentence(15)');

DELETE FROM "supplier";

SELECT
    ("agape"."f_insert_supplier" ("mock"."v_supplier_insert" ()::jsonb)).*,
    'insert' AS "dml"
FROM
    generate_series(1, 5);

SELECT
    "id" AS "target",
    ("agape"."f_update_supplier" ("data"."id", "mock")).*,
    'update' AS "dml",
    "mock"
FROM (
    SELECT
        "id",
        "mock"."v_supplier_update" ()::jsonb as "mock"
    FROM
        "supplier" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "supplier"))
    LIMIT 1) AS "data";

SELECT
    ("agape"."f_delete_supplier" ("data"."id")).*,
    'delete' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "supplier" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "supplier"))
    LIMIT 1) AS "data";

-- SELECT
--     *
-- FROM
--     "v_supplier";

