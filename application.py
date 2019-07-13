from flask import Flask, render_template, jsonify, request, session, redirect, url_for
from flask_session import Session
from models import *

app = Flask(__name__)
app.config.from_object('config.Development')
db.init_app(app)
Session(app)


@app.route("/")
def index():
    return render_template("index.html"), 200
