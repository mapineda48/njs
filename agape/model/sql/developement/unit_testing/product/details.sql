CREATE OR REPLACE VIEW "v_details_products" AS
SELECT
    jsonb_agg(row_to_json("mock".*)) AS "products"
FROM (
    SELECT
        (
            SELECT
                "id"
            FROM
                "agape"."product" OFFSET floor(random() * (
                    SELECT
                        count(*)
                        FROM "agape"."product") + ("row" * 0))
            LIMIT 1)::int4 AS "id",
        (floor(random() * (100 - 10 + 10) + 1)::int) AS "quantity",
        (floor(random() * (10000 - 100 + 100) + 1)::int) AS "unitPrice",
        (floor(random() * (10000 - 100 + 100) + 1)::numeric) AS "subTotal",
        (floor(random() * (10000 - 100 + 100) + 1)::numeric) AS "iva"
    FROM
        generate_series(1, floor(random() * (10 - 2 + 2) + 1)::int) "row") "mock";

