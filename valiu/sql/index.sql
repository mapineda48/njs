CREATE SCHEMA "valiu";

SET search_path TO "valiu";

CREATE TABLE "valiu"."tags" (
	"id" serial NOT NULL,
	"name" varchar(15) NOT NULL UNIQUE,
	"color" varchar(15) NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



