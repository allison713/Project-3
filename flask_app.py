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
import  pprint

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
        f"/ufo_comments<br/>"
        f"/ufo_cleaned<br/>"
        f"/ufo_relatives<br/>"
    )


@app.route("/ufo_comments")
def comments():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_comments')
    comments = cur.fetchall()
    #cur.close()
    conn.close()
    return json.dumps(comments, default=str)

@app.route("/ufo_relatives")
def relatives():
    relations=['aunt','baby','babies','brother','brothers','boyfriend','bride','brother','cousin',
           'dad','daughter','daughters','father','father-in-law','fiancé','fiancée',
            'friends','friend','girlfriend','godchild','godfather','godmother',
            'grandchild,','grandchildren','granddaughter','grandfather,','granddad,',
            'grandpa','grandmother','grandma','grandson','great-grandparents',
            'groom','half-brother','husband','mother','mother-in-law','mum,','mummy,',
            'mom','nephew','nephews','niece','nieces','parent','parents','sister','sisters','son','sons','stepbrother',
            'twin','twin-brother','uncle','wife']
    mentions=[]
    conn = get_db_connection()
    #cur = conn.cursor()
    sql_query = pd.read_sql_query ('''SELECT * FROM ufo_comments''', conn)
    df = pd.DataFrame(sql_query, columns = ['comments'])
    r_mentions={relation:"" for relation in relations}
    
    for relation in relations:
        r_mentions[relation]=len(df[df['comments'].str.contains(relation)])

    return r_mentions     #json.dumps(mentions, default=str)
 

"""  
anadian_cities = session.query(Sunshine).
    filter_by(Country='Canada').count()

over_3700_hours_count = session.query(Sunshine).\
    filter(Sunshine.Year >= 3700).count()




   total_count = session.query(Sunshine).distinct().count() 

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
