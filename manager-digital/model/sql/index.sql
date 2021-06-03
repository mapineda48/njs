CREATE SCHEMA "manager_digital";

CREATE TABLE "manager_digital"."person" (
    "id" serial NOT NULL,
    "full_name" varchar(100) NOT NULL UNIQUE,
    "dni" int NOT NULL UNIQUE,
    "email" varchar(50) NOT NULL UNIQUE,
    "address" varchar(50) NOT NULL,
    CONSTRAINT "person_pk" PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

