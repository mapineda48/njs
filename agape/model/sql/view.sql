CREATE OR REPLACE VIEW "agape"."v_product" AS
SELECT
    "product"."id",
    "product"."cod",
    "product"."full_name" AS "fullName",
    "product"."comment",
    "product"."sell_price" AS "sellPrice"
FROM
    "agape"."product" "product";

CREATE OR REPLACE VIEW "agape"."v_buy" AS
SELECT
    "buy"."id",
    "buy"."cod",
    "employee"."dni" AS "dniEmployee",
    "supplier"."dni" AS "dniSupplier",
    "buy"."date",
    "buy"."sub_total" AS "subTotal",
    "buy"."iva",
    "buy"."comment",
    (
        SELECT
            jsonb_agg(row_to_json("productPipe".*))
        FROM (
            SELECT
                "product"."id",
                "product"."cod",
                "product"."fullName",
                "details_buy"."quantity",
                "details_buy"."unit_price" AS "unitPrice",
                "details_buy"."sub_total" AS "subTotal",
                "details_buy"."iva"
            FROM
                "agape"."details_buy" "details_buy"
                INNER JOIN "agape"."v_product" "product" ON "details_buy"."id_product" = "product"."id"
            WHERE
                "id_buy" = "buy"."id") "productPipe")::json AS "details"
FROM
    "agape"."buy" "buy"
    INNER JOIN "agape"."employee" ON "buy"."id_employee" = "employee"."id"
    INNER JOIN "agape"."supplier" ON "buy"."id_supplier" = "supplier"."id";

CREATE OR REPLACE VIEW "agape"."v_client" AS
SELECT
    "client"."id",
    "client"."dni",
    "client"."first_name" AS "firstName",
    "client"."last_name" AS "lastName",
    "client"."phone",
    "client"."email",
    "client"."addres",
    "type_client"."full_name" AS "type"
FROM
    "agape"."client" "client"
    INNER JOIN "agape"."type_client" "type_client" ON "client"."id_type_client" = "type_client"."id";

CREATE OR REPLACE VIEW "agape"."v_details_buy" AS
SELECT
    "details_buy"."id_buy" AS "idBuy",
    "details_buy"."id_product" AS "idProduct",
    "details_buy"."quantity",
    "details_buy"."unit_price" AS "unitPrice",
    "details_buy"."sub_total" AS "subTotal",
    "details_buy"."iva"
FROM
    "agape"."details_buy" "details_buy";

CREATE OR REPLACE VIEW "agape"."v_details_sell" AS
SELECT
    "details_sell"."id_sell" AS "idSell",
    "details_sell"."id_product" AS "idProduct",
    "details_sell"."quantity",
    "details_sell"."unit_price" AS "unitPrice",
    "details_sell"."sub_total" AS "subTotal",
    "details_sell"."iva"
FROM
    "agape"."details_sell" "details_sell";

CREATE OR REPLACE VIEW "agape"."v_employee" AS
SELECT
    "employee"."id",
    "employee"."dni",
    "employee"."first_name" AS "firstName",
    "employee"."last_name" AS "lastName",
    "employee"."phone",
    "employee"."email",
    "employee"."addres",
    "type_employee"."full_name" AS "type",
    "employee"."username",
    "employee"."password"
FROM
    "agape"."employee" "employee"
    INNER JOIN "agape"."type_employee" "type_employee" ON "employee"."id_type_employee" = "type_employee"."id";

CREATE OR REPLACE VIEW "agape"."v_sell" AS
SELECT
    "sell"."id",
    "sell"."cod",
    "employee"."dni" AS "dniEmployee",
    "client"."dni" AS "dniClient",
    "sell"."date",
    "sell"."sub_total" AS "subTotal",
    "sell"."iva",
    "sell"."comment",
    (
        SELECT
            jsonb_agg(row_to_json("productPipe".*))
        FROM (
            SELECT
                "product"."id",
                "product"."cod",
                "product"."fullName",
                "details_sell"."quantity",
                "details_sell"."unit_price" AS "unitPrice",
                "details_sell"."sub_total" AS "subTotal",
                "details_sell"."iva"
            FROM
                "agape"."details_sell"
                INNER JOIN "agape"."v_product" "product" ON "details_sell"."id_product" = "product"."id"
            WHERE
                "id_sell" = "sell"."id") "productPipe")::json AS "details"
FROM
    "agape"."sell" "sell"
    INNER JOIN "agape"."employee" ON "sell"."id_employee" = "employee"."id"
    INNER JOIN "agape"."client" ON "sell"."id_client" = "client"."id";

CREATE OR REPLACE VIEW "agape"."v_supplier" AS
SELECT
    "supplier"."id",
    "supplier"."dni",
    "supplier"."first_name" AS "firstName",
    "supplier"."last_name" AS "lastName",
    "supplier"."phone",
    "supplier"."email",
    "supplier"."addres",
    "supplier"."company"
FROM
    "agape"."supplier" "supplier";

CREATE OR REPLACE VIEW "agape"."v_type_client" AS
SELECT
    "type_client"."id",
    "type_client"."full_name" AS "fullName"
FROM
    "agape"."type_client" "type_client";

CREATE OR REPLACE VIEW "agape"."v_type_employee" AS
SELECT
    "type_employee"."id",
    "type_employee"."full_name" AS "fullName"
FROM
    "agape"."type_employee" "type_employee";

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 't_details_invoice') THEN
        DROP TYPE "agape"."t_details_invoice";
    END IF;
END$$;

CREATE TYPE "agape"."t_details_invoice" AS (
    "id" int,
    "cod" text,
    "quantity" int,
    "unitPrice" int,
    "subTotal" numeric,
    "iva" numeric
);