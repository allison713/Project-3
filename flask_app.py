# Import Dependencies
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import psycopg2
import json
import  sys

app = Flask(__name__)

#AW
def get_db_connection():
    #Create an engine for the sql database
    conn_string = "host='localhost' dbname='Project-3' \
        user='postgres' password='postgres'"
    
    conn = psycopg2.connect(conn_string)
    return conn
#AW
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

#AW
@app.route("/api/ufo_comments")
def comments():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_comments LIMIT 1000;')
    comments = cur.fetchall()
    
    cur.close()
    conn.close()
    dict_={}
    list_=[]
    
    for comment in comments:
        date = comment[1].isoformat()
        dict_ = {"date": date, "latitude": comment[2], "longitude": comment[3], "comment": comment[4] }
        list_.append(dict_)

    return jsonify(list_)
    #return jsonify(list)

#AW
@app.route("/Ufo_Cleaned")
def cleaned():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_sightenings;')
    ufo = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(ufo)

#CY
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

    return jsonify(mentions)

#CY 
@app.route("/Ufo_Shapes")
def shapes():
    conn = get_db_connection()
    sql_query = pd.read_sql_query (
            '''SELECT shape, COUNT(shape), date_trunc('year', date_ocurrence) AS year FROM ufo_sightenings GROUP BY shape , year ORDER BY year;''',conn)
    conn.close()
    shapes_df = pd.DataFrame(sql_query, columns = ['shape', 'count','year'])

    dict={}
    data=[]
    for index, row in shapes_df.iterrows():
        dict={"shape":row[0], "count":row[1],"year": row[2].year}
        data.append(dict)

    return json.dumps(data, default=str)
   
@app.route("/Dashboard")
def dashboard():
    

    return render_template("index_testClau.html")



if __name__ == '__main__':
    app.run(debug=True)