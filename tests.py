import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import psycopg2
import json
conn_string = "host='localhost' dbname='Project-3'\
        user='postgres' password='postgres'"
conn = psycopg2.connect(conn_string)
data = pd.read_sql('select * from ufo_comments', conn)
print(data.head())



def shapes():
    conn = get_db_connection()
    sql_query = pd.read_sql_query (
            '''SELECT shape, COUNT(shape), date_trunc('year', date_ocurrence) AS year FROM ufo_sightenings GROUP BY shape , year ORDER BY year;''',conn)
    conn.close()
    sql_query.dtype
