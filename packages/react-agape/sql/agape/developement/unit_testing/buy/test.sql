DELETE FROM "details_buy";

DELETE FROM "buy";

CALL "mock"."init" ('v_buy', NULL, NULL, ARRAY['id']::text[]);

CALL "mock"."set" ('v_buy', 'cod', 'upper(util.random_sentence(10))');

CALL "mock"."set" ('v_buy', 'subTotal', 'util.random_between(1000,200000)');

CALL "mock"."set" ('v_buy', 'iva', 'util.random_between(1000,200000)');

CALL "mock"."set" ('v_buy', 'comment', 'util.random_sentence(50)');

CALL "mock"."set" ('v_buy', 'date', 'util.random_between(1000,200000)');

CALL "mock"."set" ('v_buy', 'dniSupplier', util.random_from ('supplier', current_schema(), 'dni'));

CALL "mock"."set" ('v_buy', 'dniEmployee', util.random_from ('employee', current_schema(), 'dni'));

CALL "mock"."set" ('v_buy', 'details', 'SELECT * FROM agape.v_details_products');


SELECT
    ("agape"."f_insert_buy" ("mock"."v_buy_insert" ()::jsonb)).*,
    'insert' AS "dml"
FROM
    generate_series(1, 5);

SELECT
    "id" AS "target",
    ("agape"."f_update_buy" ("data"."id", "mock")).*,
    'update' AS "dml",
    "mock"
FROM (
    SELECT
        "id",
        "mock"."v_buy_update" ()::jsonb as "mock"
    FROM
        "buy" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "buy"))
    LIMIT 1) AS "data";

SELECT
    ("agape"."f_delete_buy" ("data"."id")).*,
    'delete' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "buy" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "buy"))
    LIMIT 1) AS "data";

-- SELECT
--     *
-- FROM
--     "v_buy";

