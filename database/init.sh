#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE todos;
    GRANT ALL PRIVILEGES ON DATABASE todos TO postgres;
EOSQL
# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "todos" <<-EOSQL
#     CREATE TABLE todos (
#   	id 			serial PRIMARY KEY ,
#   	done		boolean default false,
#   	description	text not null,
#   	owner		varchar not null,
#   	email		varchar not null,
#   	restart_count	integer default 0,
#   	created_at	timestamp default now()
# );
# EOSQL