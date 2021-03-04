--SET client_min_messages = 'ERROR';
SELECT
    NOT EXISTS (
        SELECT
            schema_name
        FROM
            information_schema.schemata
        WHERE
            schema_name = 'agape') as not_exists_agape \gset

\if :not_exists_agape
\ir '../model.sql'
\endif

SELECT
    NOT EXISTS (
        SELECT
            schema_name
        FROM
            information_schema.schemata
        WHERE
            schema_name = 'util') as not_exists_util \gset

\if :not_exists_util
\ir '../../utils/index.sql'
\endif

SELECT
    NOT EXISTS (
        SELECT
            schema_name
        FROM
            information_schema.schemata
        WHERE
            schema_name = 'mock') as not_exists_mock \gset

\if :not_exists_mock
\ir '../util/mock.sql'
\endif


SET search_path TO "agape";



\ir '../view.sql'
\ir '../function.sql'