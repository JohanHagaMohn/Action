from flask_sqlalchemy import SQLAlchemy
from flask import Flask

db = SQLAlchemy()


class Users(db.Model):
    pass
