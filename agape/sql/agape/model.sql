CREATE SCHEMA "agape";

SET search_path TO "agape";

CREATE TABLE "client" (
    "id" serial NOT NULL,
    "dni" integer NOT NULL UNIQUE,
    "first_name" varchar(55) NOT NULL,
    "last_name" varchar(55) NOT NULL,
    "phone" varchar(150) NOT NULL,
    "email" varchar(150) NOT NULL,
    "addres" varchar(150) NOT NULL,
    "id_type_client" smallserial NOT NULL,
    CONSTRAINT "client_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "type_client" (
    "id" serial NOT NULL,
    "full_name" varchar(55) NOT NULL,
    CONSTRAINT "type_client_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "type_employee" (
    "id" serial NOT NULL,
    "full_name" varchar(55) NOT NULL,
    CONSTRAINT "type_employee_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "employee" (
    "id" serial NOT NULL,
    "dni" integer NOT NULL UNIQUE,
    "first_name" varchar(55) NOT NULL,
    "last_name" varchar(55) NOT NULL,
    "phone" varchar(150) NOT NULL,
    "email" varchar(150) NOT NULL,
    "addres" varchar(150) NOT NULL,
    "id_type_employee" smallserial NOT NULL,
    "username" varchar(55) NOT NULL,
    "password" varchar(55) NOT NULL,
    CONSTRAINT "employee_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "supplier" (
    "id" serial NOT NULL,
    "dni" integer NOT NULL UNIQUE,
    "first_name" varchar(55) NOT NULL,
    "last_name" varchar(55) NOT NULL,
    "phone" varchar(150) NOT NULL,
    "email" varchar(150) NOT NULL,
    "addres" varchar(150) NOT NULL,
    "company" varchar(55) NOT NULL,
    CONSTRAINT "supplier_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "product" (
    "id" serial NOT NULL,
    "cod" varchar(50) NOT NULL UNIQUE,
    "full_name" varchar(50) NOT NULL,
    "comment" varchar(250),
    "sell_price" DECIMAL NOT NULL,
    CONSTRAINT "product_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "details_buy" (
    "id_buy" integer NOT NULL,
    "id_product" integer NOT NULL,
    "quantity" integer NOT NULL,
    "unit_price" DECIMAL NOT NULL,
    "sub_total" DECIMAL NOT NULL,
    "iva" DECIMAL NOT NULL
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "buy" (
    "id" serial NOT NULL,
    "cod" varchar(10) NOT NULL,
    "id_employee" integer NOT NULL,
    "id_supplier" integer NOT NULL,
    "date" bigint NOT NULL,
    "sub_total" DECIMAL NOT NULL,
    "iva" DECIMAL NOT NULL,
    "comment" varchar(250),
    CONSTRAINT "buy_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "sell" (
    "id" serial NOT NULL,
    "cod" varchar(10) NOT NULL,
    "id_client" integer NOT NULL,
    "id_employee" integer NOT NULL,
    "date" bigint NOT NULL,
    "sub_total" DECIMAL NOT NULL,
    "iva" DECIMAL NOT NULL,
    "comment" varchar(100),
    CONSTRAINT "sell_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

CREATE TABLE "details_sell" (
    "id_sell" integer NOT NULL,
    "id_product" integer NOT NULL,
    "quantity" integer NOT NULL,
    "unit_price" DECIMAL NOT NULL,
    "sub_total" DECIMAL NOT NULL,
    "iva" DECIMAL NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE "client"
    ADD CONSTRAINT "client_fk0" FOREIGN KEY ("id_type_client") REFERENCES "type_client" ("id");

ALTER TABLE "employee"
    ADD CONSTRAINT "employee_fk0" FOREIGN KEY ("id_type_employee") REFERENCES "type_employee" ("id");

ALTER TABLE "details_buy"
    ADD CONSTRAINT "details_buy_fk0" FOREIGN KEY ("id_buy") REFERENCES "buy" ("id");

ALTER TABLE "details_buy"
    ADD CONSTRAINT "details_buy_fk1" FOREIGN KEY ("id_product") REFERENCES "product" ("id");

ALTER TABLE "buy"
    ADD CONSTRAINT "buy_fk0" FOREIGN KEY ("id_employee") REFERENCES "employee" ("id");

ALTER TABLE "buy"
    ADD CONSTRAINT "buy_fk1" FOREIGN KEY ("id_supplier") REFERENCES "supplier" ("id");

ALTER TABLE "sell"
    ADD CONSTRAINT "sell_fk0" FOREIGN KEY ("id_client") REFERENCES "client" ("id");

ALTER TABLE "sell"
    ADD CONSTRAINT "sell_fk1" FOREIGN KEY ("id_employee") REFERENCES "employee" ("id");

ALTER TABLE "details_sell"
    ADD CONSTRAINT "details_sell_fk0" FOREIGN KEY ("id_sell") REFERENCES "sell" ("id");

ALTER TABLE "details_sell"
    ADD CONSTRAINT "details_sell_fk1" FOREIGN KEY ("id_product") REFERENCES "product" ("id");

