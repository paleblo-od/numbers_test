from config import *
import psycopg2
from psycopg2 import Error
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
try:
    connection = psycopg2.connect(dbname=db_name,
                           user=user, host=host,
                           password=password)

    connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)  # <-- ADD THIS LINE

    cursor = connection.cursor()

    # Use the psycopg2.sql module instead of string concatenation
    # in order to avoid sql injection attacs.
    cursor.execute(sql.SQL("CREATE DATABASE {}").format(
        sql.Identifier('postgres_db'))
    )
except (Exception, Error) as error:
    print("Ошибка при работе с PostgreSQL", error)
finally:
    cursor.close()
    connection.close()
    print("Соединение с PostgreSQL закрыто")