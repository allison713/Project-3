# Import Dependencies
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import psycopg2
import json
import  sys

app = Flask(__name__)

def get_db_connection():
    #Create an engine for the sql database
    conn_string = "host='localhost' dbname='Project-3' \
        user='postgres' password='postgres'"
    
    conn = psycopg2.connect(conn_string)
    return conn


# Flask Routes
@app.route("/")
def index():
    return (
        f"Available Routes:<br/>"
        f"/Ufo_Comments<br/>"
        f"/Ufo_Cleaned<br/>"
        f"/Ufo_Relatives<br/>"
        f"/Ufo_Shapes<br/>"
        f"/Ufo_Mapping<br/>"
    )


@app.route("/Ufo_Comments")
def comments():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_comments')
    comments = cur.fetchall()
    #cur.close()
    conn.close()
    
    #res_dct = {comments[i]: comments[i + 1] for i in range(0, len(comments)-1)}
    
    #return json.dumps(res_dct, default=str, indent=4) 
    #json.dumps( [dict(x) for x in comments] ) 
    return json.dumps(comments, default=str, indent=4)

@app.route("/Ufo_Relatives")
def relatives():
    
    relations=['aunts','baby','babies','boyfriend','bride','brothers','cousins','dad','daughters',
            'father','father-in-law','fiancé','friends','girlfriend','grandchild,','grandchildren',
            'granddaughters','grandfather,','grandpa','grandmother','grandma','grandsons','groom',
            'husband','mother','mother-in-law','mum,','mummy,','mom','nephews','nieces','parents',
            'sisters','sons','twins','uncles','wife']
    mentions=[]
    
    conn = get_db_connection()
 
    sql_query = pd.read_sql_query ('''SELECT * FROM ufo_comments''',conn)
    df = pd.DataFrame(sql_query, columns = ['comments'])
    conn.close()
    mentions={relation:"" for relation in relations}
    
    for relation in relations:
        p = relation + "?"
        mentions[relation]=len(df[df['comments'].str.contains(p)])

    return json.dumps(mentions, default=str, indent=4)
 
@app.route("/Ufo_Shapes")
def cleaned():
    conn = get_db_connection()
    
    sql_query = pd.read_sql_query (
            '''SELECT shape, COUNT(shape), date_trunc('year', date_ocurrence) AS year FROM ufo_sightenings GROUP BY shape , year ORDER BY year;''',conn)
    shapes_df = pd.DataFrame(sql_query, columns = ['shape','year'])
    conn.close()
    return json.dumps(shapes_df,  default=str)


if __name__ == '__main__':
    app.run(debug=True)
"""

@app.route("/ufo_cleaned")
def cleaned():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_cleaned;')
    ufo = cur.fetchall()
    cur.close()
    conn.close()
    return json.dumps(ufo, default=str)

"""
if __name__ == '__main__':
    app.run(debug=True)
