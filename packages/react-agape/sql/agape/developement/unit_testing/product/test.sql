DELETE FROM "product";

CALL "mock"."init" ('v_product', NULL, NULL,ARRAY['id']);
CALL "mock"."set" ('v_product', 'cod', 'util.random_between(10000,100000)');
CALL "mock"."set" ('v_product', 'fullName', 'util.random_sentence(15)');
CALL "mock"."set" ('v_product', 'comment', 'util.random_sentence(50)');
CALL "mock"."set" ('v_product', 'sellPrice', 'util.random_between(100,1000)');



SELECT
    ("agape"."f_insert_product" ("mock"."v_product_insert" ()::jsonb)).*,
    'insert' AS "dml"
FROM
    generate_series(1, 5);

SELECT
    "id" AS "target",
    ("agape"."f_update_product" ("data"."id", "mock")).*,
    'update' AS "dml",
    "mock"
FROM (
    SELECT
        "id",
        "mock"."v_product_update" ()::jsonb as "mock"
    FROM
        "product" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "product"))
    LIMIT 1) AS "data";

SELECT
    ("agape"."f_delete_product" ("data"."id")).*,
    'delete' AS "dml"
FROM (
    SELECT
        "id"
    FROM
        "product" OFFSET floor(random() * (
            SELECT
                count(*)
                FROM "product"))
    LIMIT 1) AS "data";

-- SELECT
--     *
-- FROM
--     "v_product";

