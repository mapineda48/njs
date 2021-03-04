CREATE OR REPLACE FUNCTION "agape"."f_insert_type_client" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_type_client"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."type_client" ("full_name")
    SELECT
        "type_client"."full_name"
    FROM (
        SELECT
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'fullName')::varchar AS "full_name"
        FROM (
            SELECT
                _json_input AS "json") "input") "type_client"
RETURNING
    id INTO _id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_type_client"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_type_client" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_type_client"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4 := (_json_input ->> 'id');
    _full_name varchar := (_json_input ->> 'fullName');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"full_name" = ' || quote_literal(_full_name) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."type_client" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_type_client"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_type_client" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_type_client"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_type_client";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_type_client"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."type_client"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_sell" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_sell"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."sell" ("id_client", "id_employee", "date", "sub_total", "iva", "cod", "comment")
    SELECT
        "client"."id" AS "id_client",
        "employee"."id" AS "id_employee",
        "sell"."date",
        "sell"."sub_total",
        "sell"."iva",
        "sell"."cod",
        "sell"."comment"
    FROM (
        SELECT
            ("input"."json" ->> 'subTotal')::numeric AS "sub_total",
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'dniEmployee')::int4 AS "dni_employee",
            ("input"."json" ->> 'dniClient')::int4 AS "dni_client",
            ("input"."json" ->> 'date')::int8 AS "date",
            ("input"."json" ->> 'iva')::numeric AS "iva",
            ("input"."json" ->> 'details')::json AS "details",
            ("input"."json" ->> 'cod')::varchar AS "cod",
            ("input"."json" ->> 'comment')::varchar AS "comment"
        FROM (
            SELECT
                _json_input AS "json") "input") "sell"
    INNER JOIN "agape"."employee" ON "sell"."dni_employee" = "employee"."dni"
    INNER JOIN "agape"."client" ON "sell"."dni_client" = "client"."dni"
RETURNING
    id INTO _id;

    /*
     *insert details fo invoice
     */
    INSERT INTO "agape"."details_sell" ("id_sell", "id_product", "quantity", "unit_price", "sub_total", "iva")
    SELECT
        "details_sell"."id_sell",
        "details_sell"."id_product",
        "details_sell"."quantity",
        "details_sell"."unit_price",
        "details_sell"."sub_total",
        "details_sell"."iva"
    FROM (
        SELECT
            _id AS "id_sell",
            "input"."id" AS "id_product",
            "input"."quantity" AS "quantity",
            "input"."unitPrice" AS "unit_price",
            "input"."subTotal" AS "sub_total",
            "input"."iva" AS "iva"
        FROM
            jsonb_populate_recordset(NULL::"agape"."t_details_invoice", (_json_input ->> 'details')::jsonb) "input") "details_sell";
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_sell"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_sell" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_sell"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _sub_total numeric := (_json_input ->> 'subTotal');
    _id int4 := (_json_input ->> 'id');
    _dni_employee int4 := (_json_input ->> 'dniEmployee');
    _dni_client int4 := (_json_input ->> 'dniClient');
    _id_employee int4 := (
        SELECT
            "id"
        FROM
            "agape"."employee"
        WHERE
            "dni" = _dni_employee);
    _id_client int4 := (
        SELECT
            "id"
        FROM
            "agape"."client"
        WHERE
            "dni" = _dni_client);
    _date int8 := (_json_input ->> 'date');
    _iva numeric := (_json_input ->> 'iva');
    _details json := (_json_input ->> 'details');
    _cod varchar := (_json_input ->> 'cod');
    _comment varchar := (_json_input ->> 'comment');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_client" = ' || _id_client || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_employee" = ' || _id_employee || '::int4');
    _arr_columns = array_append(_arr_columns, '"date" = ' || _date || '::int8');
    _arr_columns = array_append(_arr_columns, '"sub_total" = ' || _sub_total || '::numeric');
    _arr_columns = array_append(_arr_columns, '"iva" = ' || _iva || '::numeric');
    _arr_columns = array_append(_arr_columns, '"cod" = ' || quote_literal(_cod) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"comment" = ' || quote_literal(_comment) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."sell" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;

    /*
     *update details sell
     */
    IF _details IS NOT NULL THEN
        DELETE FROM "agape"."details_sell"
        WHERE id_sell = _where_id;
        INSERT INTO "agape"."details_sell" ("id_sell", "id_product", "quantity", "unit_price", "sub_total", "iva")
        SELECT
            "details_sell"."id_sell",
            "details_sell"."id_product",
            "details_sell"."quantity",
            "details_sell"."unit_price",
            "details_sell"."sub_total",
            "details_sell"."iva"
        FROM (
            SELECT
                _where_id AS "id_sell",
                "input"."id" AS "id_product",
                "input"."quantity" AS "quantity",
                "input"."unitPrice" AS "unit_price",
                "input"."subTotal" AS "sub_total",
                "input"."iva" AS "iva"
            FROM
                jsonb_populate_recordset(NULL::"agape"."t_details_invoice", (_json_input ->> 'details')::jsonb) "input") "details_sell";
    END IF;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_sell"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_sell" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_sell"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_sell";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_sell"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."details_sell"
    WHERE "id_sell" = _where_id;
    DELETE FROM "agape"."sell"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_buy" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_buy"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."buy" ("id_supplier", "id_employee", "date", "sub_total", "iva", "cod", "comment")
    SELECT
        "supplier"."id" AS "id_supplier",
        "employee"."id" AS "id_employee",
        "buy"."date",
        "buy"."sub_total",
        "buy"."iva",
        "buy"."cod",
        "buy"."comment"
    FROM (
        SELECT
            ("input"."json" ->> 'subTotal')::numeric AS "sub_total",
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'dniEmployee')::int4 AS "dni_employee",
            ("input"."json" ->> 'dniSupplier')::int4 AS "dni_supplier",
            ("input"."json" ->> 'date')::int8 AS "date",
            ("input"."json" ->> 'iva')::numeric AS "iva",
            ("input"."json" ->> 'details')::json AS "details",
            ("input"."json" ->> 'cod')::varchar AS "cod",
            ("input"."json" ->> 'comment')::varchar AS "comment"
        FROM (
            SELECT
                _json_input AS "json") "input") "buy"
    INNER JOIN "agape"."employee" ON "buy"."dni_employee" = "employee"."dni"
    INNER JOIN "agape"."supplier" ON "buy"."dni_supplier" = "supplier"."dni"
RETURNING
    id INTO _id;

    /*
     *insert details fo invoice
     */
    INSERT INTO "agape"."details_buy" ("id_buy", "id_product", "quantity", "unit_price", "sub_total", "iva")
    SELECT
        "details_buy"."id_buy",
        "details_buy"."id_product",
        "details_buy"."quantity",
        "details_buy"."unit_price",
        "details_buy"."sub_total",
        "details_buy"."iva"
    FROM (
        SELECT
            _id AS "id_buy",
            "input"."id" AS "id_product",
            "input"."quantity" AS "quantity",
            "input"."unitPrice" AS "unit_price",
            "input"."subTotal" AS "sub_total",
            "input"."iva" AS "iva"
        FROM
            jsonb_populate_recordset(NULL::"agape"."t_details_invoice", (_json_input ->> 'details')::jsonb) "input") "details_buy";
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_buy"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_buy" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_buy"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _sub_total numeric := (_json_input ->> 'subTotal');
    _id int4 := (_json_input ->> 'id');
    _dni_employee int4 := (_json_input ->> 'dniEmployee');
    _dni_supplier int4 := (_json_input ->> 'dniSupplier');
    _id_employee int4 := (
        SELECT
            "id"
        FROM
            "agape"."employee"
        WHERE
            "dni" = _dni_employee);
    _id_supplier int4 := (
        SELECT
            "id"
        FROM
            "agape"."supplier"
        WHERE
            "dni" = _dni_supplier);
    _date int8 := (_json_input ->> 'date');
    _iva numeric := (_json_input ->> 'iva');
    _details json := (_json_input ->> 'details');
    _cod varchar := (_json_input ->> 'cod');
    _comment varchar := (_json_input ->> 'comment');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_supplier" = ' || _id_supplier || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_employee" = ' || _id_employee || '::int4');
    _arr_columns = array_append(_arr_columns, '"date" = ' || _date || '::int8');
    _arr_columns = array_append(_arr_columns, '"sub_total" = ' || _sub_total || '::numeric');
    _arr_columns = array_append(_arr_columns, '"iva" = ' || _iva || '::numeric');
    _arr_columns = array_append(_arr_columns, '"cod" = ' || quote_literal(_cod) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"comment" = ' || quote_literal(_comment) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."buy" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;

    /*
     *update details buy
     */
    IF _details IS NOT NULL THEN
        DELETE FROM "agape"."details_buy"
        WHERE id_buy = _where_id;
        INSERT INTO "agape"."details_buy" ("id_buy", "id_product", "quantity", "unit_price", "sub_total", "iva")
        SELECT
            "details_buy"."id_buy",
            "details_buy"."id_product",
            "details_buy"."quantity",
            "details_buy"."unit_price",
            "details_buy"."sub_total",
            "details_buy"."iva"
        FROM (
            SELECT
                _where_id AS "id_buy",
                "input"."id" AS "id_product",
                "input"."quantity" AS "quantity",
                "input"."unitPrice" AS "unit_price",
                "input"."subTotal" AS "sub_total",
                "input"."iva" AS "iva"
            FROM
                jsonb_populate_recordset(NULL::"agape"."t_details_invoice", (_json_input ->> 'details')::jsonb) "input") "details_buy";
    END IF;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_buy"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_buy" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_buy"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_buy";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_buy"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."details_buy"
    WHERE "id_buy" = _where_id;
    DELETE FROM "agape"."buy"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_client" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_client"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."client" ("dni", "id_type_client", "first_name", "last_name", "phone", "email", "addres")
    SELECT
        "client"."dni",
        "type_client"."id",
        "client"."first_name",
        "client"."last_name",
        "client"."phone",
        "client"."email",
        "client"."addres"
    FROM (
        SELECT
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'dni')::int4 AS "dni",
            ("input"."json" ->> 'email')::varchar AS "email",
            ("input"."json" ->> 'addres')::varchar AS "addres",
            ("input"."json" ->> 'type')::varchar AS "type",
            ("input"."json" ->> 'firstName')::varchar AS "first_name",
            ("input"."json" ->> 'lastName')::varchar AS "last_name",
            ("input"."json" ->> 'phone')::varchar AS "phone"
        FROM (
            SELECT
                _json_input AS "json") "input") "client"
    INNER JOIN "agape"."type_client" "type_client" ON "client"."type" = "type_client"."full_name"
RETURNING
    id INTO _id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_client"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_client" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_client"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4 := (_json_input ->> 'id');
    _dni int4 := (_json_input ->> 'dni');
    _email varchar := (_json_input ->> 'email');
    _addres varchar := (_json_input ->> 'addres');
    _type varchar := (_json_input ->> 'type');
    _first_name varchar := (_json_input ->> 'firstName');
    _last_name varchar := (_json_input ->> 'lastName');
    _phone varchar := (_json_input ->> 'phone');
    _id_type_client int2 := (
        SELECT
            "id"
        FROM
            "agape"."type_client"
        WHERE
            "full_name" = _type);
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"dni" = ' || _dni || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_type_client" = ' || _id_type_client || '::int2');
    _arr_columns = array_append(_arr_columns, '"first_name" = ' || quote_literal(_first_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"last_name" = ' || quote_literal(_last_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"phone" = ' || quote_literal(_phone) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"email" = ' || quote_literal(_email) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"addres" = ' || quote_literal(_addres) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."client" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_client"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_client" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_client"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_client";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_client"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."client"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_type_employee" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_type_employee"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."type_employee" ("full_name")
    SELECT
        "type_employee"."full_name"
    FROM (
        SELECT
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'fullName')::varchar AS "full_name"
        FROM (
            SELECT
                _json_input AS "json") "input") "type_employee"
RETURNING
    id INTO _id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_type_employee"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_type_employee" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_type_employee"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4 := (_json_input ->> 'id');
    _full_name varchar := (_json_input ->> 'fullName');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"full_name" = ' || quote_literal(_full_name) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."type_employee" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_type_employee"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_type_employee" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_type_employee"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_type_employee";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_type_employee"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."type_employee"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_product" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_product"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."product" ("sell_price", "cod", "full_name", "comment")
    SELECT
        "product"."sell_price",
        "product"."cod",
        "product"."full_name",
        "product"."comment"
    FROM (
        SELECT
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'sellPrice')::numeric AS "sell_price",
            ("input"."json" ->> 'cod')::varchar AS "cod",
            ("input"."json" ->> 'fullName')::varchar AS "full_name",
            ("input"."json" ->> 'comment')::varchar AS "comment"
        FROM (
            SELECT
                _json_input AS "json") "input") "product"
RETURNING
    id INTO _id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_product"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_product" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_product"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4 := (_json_input ->> 'id');
    _sell_price numeric := (_json_input ->> 'sellPrice');
    _cod varchar := (_json_input ->> 'cod');
    _full_name varchar := (_json_input ->> 'fullName');
    _comment varchar := (_json_input ->> 'comment');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"sell_price" = ' || _sell_price || '::numeric');
    _arr_columns = array_append(_arr_columns, '"cod" = ' || quote_literal(_cod) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"full_name" = ' || quote_literal(_full_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"comment" = ' || quote_literal(_comment) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."product" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_product"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_product" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_product"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_product";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_product"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."product"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_details_buy" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_details_buy"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id_buy int4;
BEGIN
    INSERT INTO "agape"."details_buy" ("id_buy", "id_product", "quantity", "unit_price", "sub_total", "iva")
    SELECT
        "details_buy"."id_buy",
        "details_buy"."id_product",
        "details_buy"."quantity",
        "details_buy"."unit_price",
        "details_buy"."sub_total",
        "details_buy"."iva"
    FROM (
        SELECT
            ("input"."json" ->> 'idBuy')::int4 AS "id_buy",
            ("input"."json" ->> 'idProduct')::int4 AS "id_product",
            ("input"."json" ->> 'quantity')::int4 AS "quantity",
            ("input"."json" ->> 'unitPrice')::numeric AS "unit_price",
            ("input"."json" ->> 'subTotal')::numeric AS "sub_total",
            ("input"."json" ->> 'iva')::numeric AS "iva"
        FROM (
            SELECT
                _json_input AS "json") "input") "details_buy"
RETURNING
    id_buy INTO _id_buy;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_details_buy"
    WHERE
        "id_buy" = _id_buy;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_details_buy" (
    _where_id_buy int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_details_buy"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id_buy int4 := (_json_input ->> 'idBuy');
    _id_product int4 := (_json_input ->> 'idProduct');
    _quantity int4 := (_json_input ->> 'quantity');
    _unit_price numeric := (_json_input ->> 'unitPrice');
    _sub_total numeric := (_json_input ->> 'subTotal');
    _iva numeric := (_json_input ->> 'iva');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id_buy" = ' || _id_buy || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_product" = ' || _id_product || '::int4');
    _arr_columns = array_append(_arr_columns, '"quantity" = ' || _quantity || '::int4');
    _arr_columns = array_append(_arr_columns, '"unit_price" = ' || _unit_price || '::numeric');
    _arr_columns = array_append(_arr_columns, '"sub_total" = ' || _sub_total || '::numeric');
    _arr_columns = array_append(_arr_columns, '"iva" = ' || _iva || '::numeric');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."details_buy" SET %s WHERE "id_buy" = %s RETURNING "id_buy"', _columns, _where_id_buy) INTO _where_id_buy;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_details_buy"
    WHERE
        "id_buy" = _where_id_buy;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_details_buy" (
    _where_id_buy int4
)
    RETURNS SETOF "agape"."v_details_buy"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_details_buy";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_details_buy"
    WHERE
        "id_buy" = _where_id_buy;
    DELETE FROM "agape"."details_buy"
    WHERE "id_buy" = _where_id_buy;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_supplier" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_supplier"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."supplier" ("dni", "first_name", "last_name", "phone", "email", "addres", "company")
    SELECT
        "supplier"."dni",
        "supplier"."first_name",
        "supplier"."last_name",
        "supplier"."phone",
        "supplier"."email",
        "supplier"."addres",
        "supplier"."company"
    FROM (
        SELECT
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'dni')::int4 AS "dni",
            ("input"."json" ->> 'firstName')::varchar AS "first_name",
            ("input"."json" ->> 'lastName')::varchar AS "last_name",
            ("input"."json" ->> 'phone')::varchar AS "phone",
            ("input"."json" ->> 'email')::varchar AS "email",
            ("input"."json" ->> 'addres')::varchar AS "addres",
            ("input"."json" ->> 'company')::varchar AS "company"
        FROM (
            SELECT
                _json_input AS "json") "input") "supplier"
RETURNING
    id INTO _id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_supplier"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_supplier" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_supplier"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4 := (_json_input ->> 'id');
    _dni int4 := (_json_input ->> 'dni');
    _first_name varchar := (_json_input ->> 'firstName');
    _last_name varchar := (_json_input ->> 'lastName');
    _phone varchar := (_json_input ->> 'phone');
    _email varchar := (_json_input ->> 'email');
    _addres varchar := (_json_input ->> 'addres');
    _company varchar := (_json_input ->> 'company');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"dni" = ' || _dni || '::int4');
    _arr_columns = array_append(_arr_columns, '"first_name" = ' || quote_literal(_first_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"last_name" = ' || quote_literal(_last_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"phone" = ' || quote_literal(_phone) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"email" = ' || quote_literal(_email) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"addres" = ' || quote_literal(_addres) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"company" = ' || quote_literal(_company) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."supplier" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_supplier"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_supplier" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_supplier"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_supplier";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_supplier"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."supplier"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_details_sell" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_details_sell"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id_sell int4;
BEGIN
    INSERT INTO "agape"."details_sell" ("id_sell", "id_product", "quantity", "unit_price", "sub_total", "iva")
    SELECT
        "details_sell"."id_sell",
        "details_sell"."id_product",
        "details_sell"."quantity",
        "details_sell"."unit_price",
        "details_sell"."sub_total",
        "details_sell"."iva"
    FROM (
        SELECT
            ("input"."json" ->> 'idSell')::int4 AS "id_sell",
            ("input"."json" ->> 'idProduct')::int4 AS "id_product",
            ("input"."json" ->> 'quantity')::int4 AS "quantity",
            ("input"."json" ->> 'unitPrice')::numeric AS "unit_price",
            ("input"."json" ->> 'subTotal')::numeric AS "sub_total",
            ("input"."json" ->> 'iva')::numeric AS "iva"
        FROM (
            SELECT
                _json_input AS "json") "input") "details_sell"
RETURNING
    id_sell INTO _id_sell;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_details_sell"
    WHERE
        "id_sell" = _id_sell;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_details_sell" (
    _where_id_sell int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_details_sell"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id_sell int4 := (_json_input ->> 'idSell');
    _id_product int4 := (_json_input ->> 'idProduct');
    _quantity int4 := (_json_input ->> 'quantity');
    _unit_price numeric := (_json_input ->> 'unitPrice');
    _sub_total numeric := (_json_input ->> 'subTotal');
    _iva numeric := (_json_input ->> 'iva');
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"id_sell" = ' || _id_sell || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_product" = ' || _id_product || '::int4');
    _arr_columns = array_append(_arr_columns, '"quantity" = ' || _quantity || '::int4');
    _arr_columns = array_append(_arr_columns, '"unit_price" = ' || _unit_price || '::numeric');
    _arr_columns = array_append(_arr_columns, '"sub_total" = ' || _sub_total || '::numeric');
    _arr_columns = array_append(_arr_columns, '"iva" = ' || _iva || '::numeric');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."details_sell" SET %s WHERE "id_sell" = %s RETURNING "id_sell"', _columns, _where_id_sell) INTO _where_id_sell;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_details_sell"
    WHERE
        "id_sell" = _where_id_sell;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_details_sell" (
    _where_id_sell int4
)
    RETURNS SETOF "agape"."v_details_sell"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_details_sell";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_details_sell"
    WHERE
        "id_sell" = _where_id_sell;
    DELETE FROM "agape"."details_sell"
    WHERE "id_sell" = _where_id_sell;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_insert_employee" (
    _json_input jsonb
)
    RETURNS SETOF "agape"."v_employee"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _id int4;
BEGIN
    INSERT INTO "agape"."employee" ("dni", "id_type_employee", "first_name", "last_name", "phone", "email", "addres", "username", "password")
    SELECT
        "employee"."dni",
        "type_employee"."id",
        "employee"."first_name",
        "employee"."last_name",
        "employee"."phone",
        "employee"."email",
        "employee"."addres",
        "employee"."username",
        "employee"."password"
    FROM (
        SELECT
            ("input"."json" ->> 'dni')::int4 AS "dni",
            ("input"."json" ->> 'id')::int4 AS "id",
            ("input"."json" ->> 'firstName')::varchar AS "first_name",
            ("input"."json" ->> 'lastName')::varchar AS "last_name",
            ("input"."json" ->> 'phone')::varchar AS "phone",
            ("input"."json" ->> 'email')::varchar AS "email",
            ("input"."json" ->> 'addres')::varchar AS "addres",
            ("input"."json" ->> 'type')::varchar AS "type",
            ("input"."json" ->> 'username')::varchar AS "username",
            ("input"."json" ->> 'password')::varchar AS "password"
        FROM (
            SELECT
                _json_input AS "json") "input") "employee"
    INNER JOIN "agape"."type_employee" "type_employee" ON "type_employee"."full_name" = "employee"."type"
RETURNING
    id INTO _id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_employee"
    WHERE
        "id" = _id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_update_employee" (
    _where_id int4, _json_input jsonb
)
    RETURNS SETOF "agape"."v_employee"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _dni int4 := (_json_input ->> 'dni');
    _id int4 := (_json_input ->> 'id');
    _first_name varchar := (_json_input ->> 'firstName');
    _last_name varchar := (_json_input ->> 'lastName');
    _phone varchar := (_json_input ->> 'phone');
    _email varchar := (_json_input ->> 'email');
    _addres varchar := (_json_input ->> 'addres');
    _type varchar := (_json_input ->> 'type');
    _username varchar := (_json_input ->> 'username');
    _password varchar := (_json_input ->> 'password');
    _id_type_employee int2 := (
        SELECT
            "id"
        FROM
            "agape"."type_client"
        WHERE
            "full_name" = _type);
    _arr_columns text[];
    _columns text;
BEGIN
    _arr_columns = array_append(_arr_columns, '"dni" = ' || _dni || '::int4');
    _arr_columns = array_append(_arr_columns, '"id" = ' || _id || '::int4');
    _arr_columns = array_append(_arr_columns, '"id_type_employee" = ' || _id_type_employee || '::int2');
    _arr_columns = array_append(_arr_columns, '"first_name" = ' || quote_literal(_first_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"last_name" = ' || quote_literal(_last_name) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"phone" = ' || quote_literal(_phone) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"email" = ' || quote_literal(_email) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"addres" = ' || quote_literal(_addres) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"username" = ' || quote_literal(_username) || '::varchar');
    _arr_columns = array_append(_arr_columns, '"password" = ' || quote_literal(_password) || '::varchar');
    SELECT
        string_agg("values", ',') INTO _columns
    FROM (
        SELECT
            unnest(_arr_columns) AS "values") "data"
WHERE
    "values" IS NOT NULL;
    EXECUTE format('UPDATE "agape"."employee" SET %s WHERE "id" = %s RETURNING "id"', _columns, _where_id) INTO _where_id;
    RETURN QUERY
    SELECT
        *
    FROM
        "agape"."v_employee"
    WHERE
        "id" = _where_id;
END;
$$;

CREATE OR REPLACE FUNCTION "agape"."f_delete_employee" (
    _where_id int4
)
    RETURNS SETOF "agape"."v_employee"
    LANGUAGE plpgsql
    AS $$
DECLARE
    _row "agape"."v_employee";
BEGIN
    SELECT
        * INTO _row
    FROM
        "agape"."v_employee"
    WHERE
        "id" = _where_id;
    DELETE FROM "agape"."employee"
    WHERE "id" = _where_id;
    RETURN QUERY
    SELECT
        (_row).*;
END;
$$;

