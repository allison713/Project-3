import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import psycopg2
import psycopg2.extras
import json
from flask_cors import CORS


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
        f"<h1 align = 'center' >Welcome to the UFO Information Application</h1>"
        f"<h1>This sight has data about sightings and reports</h1><br/><br/><br/>"
             
        f"<h2>Here you can get the hyperlinked - list click the link to see the pages:</h2><br/>"
        
        f"<ul><li><a  href= 'http://127.0.0.1:5000/api/v1.0/ufo_comments', style = 'font-size: 14px'>"
        f"JSON list of real comments by date for the most recent years of the data available</a></li><br/>"

        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/ufo_sighting_data'>"
        f"JSON list of sighting details by date and with locations</a></li><br/>")



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

if __name__ == '__main__':
    app.run(debug=True)