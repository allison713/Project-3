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


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

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
        f"JSON list of sighting details by date and with locations</a></li><br/>"
       
        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/ufo_sighting_by_date'>"
        f"JSON list of the last 12 months of recorded sightings</a></li><br/>"

        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/ufo_shapes_reported_fequency'>"
        f"This gives filtered informamtion of frequency by location</a></li><br/>"

        f"<li><a href= 'http://127.0.0.1:5000/api/v1.0/other_ufo_filtered_data'>"
        f"other ufo filtered data</a></li></ul><br/>"
    )



@app.route("/api/v1.0/ufo_comments")
def comments():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM ufo_comments;')
    comments = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(comments)
 
#route for displaying sighting data
@app.route("/api/v1.0/ufo_sighting_data")
def cleaned():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM ufo_sightenings;')
    ufo = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(ufo)
  
#route that filters ufo_comments by location grouped by date
@app.route("/api/v1.0/ufo_sighting_by_date")
def ufo_sighting_by_date():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    #cur.execute('SELECT * FROM ufo_ufo_sightenings WHERE "state" GROUPED BY date_ocurrence ;')
    cur.execute('SELECT * FROM ufo_sightenings WHERE "country" GROUPED BY date_ocurrence ;')
    ufo_sighting_by_date = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(ufo_sighting_by_date)
   

#@app.route(/ufo_sighting_by_date")
#return()

#@app.route(/ufo_shapes_reported_fequency)
#return()

#@app.route(/other_ufo_filtered_data)
#return()
#@app.route("/image.jpg")
#def image():
#    return render_template("image.jpg")

@app.route("/<name>")
def user(name):
    return f"Hello-- {name}!"

@app.route("/admin")
def admin():
    return redirect(url_for("home"))



if __name__ == '__main__':
    app.run(debug=True)