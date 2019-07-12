import os

from flask import Flask, render_template, jsonify, request, session, redirect, url_for
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))
app = Flask(__name__)
Session(app)


@app.route("/")
def index():
    return render_template("index.html"), 200
