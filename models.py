from application import db
from flask_login import UserMixin


class Users(UserMixin, db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(32), nullable=False)
