-- https://www.postgresqltutorial.com/postgresql-create-table/
CREATE TABLE IF NOT EXISTS greetings (
    "message" varchar(50) PRIMARY KEY
);

-- https://www.postgresqltutorial.com/postgresql-insert/
INSERT INTO greetings ("message")
    VALUES ('PostgreSQL, Nodejs and ReactJs greet you!!!');

