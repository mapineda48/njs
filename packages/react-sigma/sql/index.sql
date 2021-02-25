 DROP SCHEMA "sigma" CASCADE;

CREATE SCHEMA "sigma";

CREATE TABLE "sigma"."person" (
	"id" serial NOT NULL,
	"full_name" varchar(100) NOT NULL UNIQUE,
	"email" varchar(50) NOT NULL UNIQUE,
	"department" varchar(50) NOT NULL,
	"city" varchar(50) NOT NULL,
	CONSTRAINT "person_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);