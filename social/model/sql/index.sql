CREATE SCHEMA "social";

CREATE TABLE "social"."document"(
	"id" TEXT UNIQUE,
	"data" jsonb
) WITH (OIDS = FALSE);