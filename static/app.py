import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template, json, current_app as app, jsonify
import psycopg2
import psycopg2.extras
import json
from flask_cors import CORS
import os

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

def get_db_connection():
    # Create an engine for the sql database
    conn_string = "host='localhost' dbname='Project-3'\
        user='postgres' password='postgres'"

    
    conn = psycopg2.connect(conn_string)
    return conn


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"<h1 align = 'center'>Welcome to the UFO Information Application</h1>"
        f"<h1>This sight has data about sightings and reports</h1><br/><br/><br/>"
             
        f"<h2>Here you can get the hyperlinked - list click the link to see the pages:</h2><br/>"
        
        f"<ul><li><a  href= 'http://127.0.0.1:5000/api/v1.0/ufo_comments', style = 'font-size: 14px'>"
        f"JSON list of real comments by date for the most recent years of the data available</a></li><br/>"

        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/ufo_sighting_data'>"
        f"JSON list of sighting details by date and with locations</a></li><br/>"
        
        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/ufo_shapes'>"
        f"JSON list of shapes</a></li><br/>"
        
        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/ufo_relatives'>"
        f"JSON list of relatives reported</a></li><br/>"
        )



@app.route("/api/v1.0/ufo_comments")
def comments():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM ufo_comments;')
    comments = cur.fetchall()

    dict1={}
    list1=[]
    
    for comment in comments:
        dict1 = {"date": comment[1], "latitude": comment[2], "longitude": comment[3], "comment": comment[4] }
        list1.append(dict1)

    cur.close()
    conn.close()
    
    return jsonify(list1)
 
#route for displaying sighting data
@app.route("/api/v1.0/ufo_sighting_data")
def cleaned():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM ufo_sightnings;')
    ufo = cur.fetchall()
    
    dict1={}
    list1=[]
    
    for sighting in ufo:
        dict1 = {"date": sighting[1], "city": sighting[2], "state": sighting[3], "country": sighting[4], "shape": sighting[5], "duration_seconds": sighting[6], "duration_hours_min": sighting[7], "date_posted": sighting[8], "latitude": sighting[9], "longitude": sighting[10]}
        list1.append(dict1)

    cur.close()
    conn.close()
    return jsonify(list1)

@app.route("/api/v1.0/ufo_shapes")
def shapes():
    #Create list of states
    conn = get_db_connection()
    sql_query = pd.read_sql_query (
            '''SELECT state, country, shape FROM ufo_sightings;''',conn)
    conn.close()
    df = pd.DataFrame(sql_query, columns = ['state','country','shape'])
    figures= ['light', 'triangle', 'circle', 'fireball', 'other', 'sphere', 'disk', 'oval',
            'formation', 'cigar', 'changing', 'flash', 'rectangle', 'cylinder', 'diamond', 'chevron',
            'egg', 'teardrop', 'cone', 'cross', 'delta', 'round', 'crescent', 'pyramid', 'flare',
            'hexagon', 'dome', 'not specified']
    dict1={figure:'' for figure in figures}
    for figure in figures:
        dict1[figure]=len(df[df['shape'].str.contains(figure)])
    return jsonify(dict1)



@app.route("/api/v1.0/ufo_relatives")
def relatives():
    group_rel=['aunts','brothers','cousins','daughters','friends','granddaughters','grandsons','nephews','nieces','parents','sisters',
               'sons','twins','uncles']
    ind_rel=['baby','babies','boyfriend','bride','dad','father','father-in-law','fiancé','girlfriend','grandchild,','grandchildren',
                  'grandfather,','grandpa','grandmother','grandma','groom','husband','mother','mother-in-law','mum,','mummy,','mom','wife']
    conn = get_db_connection()
    
    sql_query = pd.read_sql_query ('''SELECT * FROM ufo_comments''',conn)
    df = pd.DataFrame(sql_query, columns = ['comments'])
    conn.close()
    
    groups={group:"" for group in group_rel}
    inds={individual:"" for individual in ind_rel}

    for group in group_rel:
        p = group + "?"
        groups[group]=len(df[df['comments'].str.contains(p)])
    
    for individual in ind_rel:
        inds[individual]=len(df[df['comments'].str.contains(individual)])
    
    
    groups.update(inds)
    
    return jsonify(groups)

if __name__ == '__main__':
    app.run(debug=True)