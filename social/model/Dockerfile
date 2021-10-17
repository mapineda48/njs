# https://hub.docker.com/_/postgres/

FROM postgres:12

# RUN apt-get update

ADD bin /docker-entrypoint-initdb.d

ADD sql /sql

RUN chmod a+r /docker-entrypoint-initdb.d/*