DELETE FROM "details_sell";
DELETE FROM "sell";
CALL "mock"."init" ('v_sell',NULL,NULL,ARRAY['id']::text[]);
CALL "mock"."set" ('v_sell', 'cod', 'upper(util.random_sentence(10))');
CALL "mock"."set" ('v_sell', 'subTotal', 'util.random_between(1000,200000)');
CALL "mock"."set" ('v_sell', 'iva', 'util.random_between(1000,200000)');
CALL "mock"."set" ('v_sell', 'comment', 'util.random_sentence(50)');
CALL "mock"."set" ('v_sell', 'date', 'util.random_between(1000,200000)');
CALL "mock"."set" ('v_sell', 'dniClient', util.random_from ('client', current_schema(), 'dni'));
CALL "mock"."set" ('v_sell', 'dniEmployee', util.random_from ('employee', current_schema(), 'dni'));
CALL "mock"."set" ('v_sell', 'details', 'SELECT * FROM agape.v_details_products');


SELECT
    ("agape"."f_insert_sell" ("mock"."v_sell_insert" ()::jsonb)).*,
    'insert' AS "dml"
FROM
    generate_series(1, 5);

SELECT
    "id" AS "target",
    ("agape"."f_update_sell" ("data"."id", "mock")).*,
    'update' AS "dml",
    "mock"
FROM (
    SELECT
        "id",
        "mock"."v_sell_update" ()::jsonb as "mock"
    FROM
        "sell" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "sell"))
    LIMIT 1) AS "data";

SELECT
    ("agape"."f_delete_sell" ("data"."id")).*,
    'delete' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "sell" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "sell"))
    LIMIT 1) AS "data";

-- SELECT
--     *
-- FROM
--     "v_sell";

