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

# Flask Setup
app = Flask(__name__)

def get_db_connection():
    # Create an engine for the sql database
    conn_string = "host='localhost' dbname='Project-3'\
        user='postgres' password='Dee 1s the best'"
    
    conn = psycopg2.connect(conn_string)
    return conn

# Flask Routes
@app.route("/")
def index():
    return (
        f"Available Routes:<br/>"
        f"/ufo_comments<br/>"
        f"/ufo_cleaned<br/>"
    )


@app.route("/ufo_comments")
def comments():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_comments;')
    comments = cur.fetchall()
    cur.close()
    conn.close()
    return json.dumps(comments, default=str)


@app.route("/ufo_cleaned")
def cleaned():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM ufo_cleaned;')
    ufo = cur.fetchall()
    cur.close()
    conn.close()
    return json.dumps(ufo, default=str)

if __name__ == '__main__':
    app.run(debug=True)