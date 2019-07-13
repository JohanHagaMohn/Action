from flask_sqlalchemy import SQLAlchemy
from flask import Flask

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
