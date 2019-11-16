from flask import Blueprint, render_template, redirect, url_for, request
from werkzeug.security import generate_password_hash
from models import Users
from application import db

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["GET"])
def login():
    return render_template("login.html"), 200


@auth.route('/login', methods=["POST"])
def login_post():
    return render_template("login.html"), 200


@auth.route('/register', methods=["GET", "POST"])
def register():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    confirm = request.form.get("confirm")
    error = {
        "username": None,
        "email": None,
        "password": None,
        "confirm": None
    }
    user = {
        "username": "",
        "email": "",
        "password": "",
        "confirm": ""
    }
    if request.method == "POST":
        if not username:
            error["username"] = "Please provide a username"
        elif len(username) < 8:
            error["username"] = "Please provide a longer username"
        elif not username.isalnum():
            error["username"] = "Please use alphanumeric characters"
        elif Users.query.filter_by(username=username).first():
            error["username"] = "Please use a different username"
        else:
            user["username"] = username

        if not email:
            error["email"] = "Please provide an email"
        elif "@" not in email or "." not in email:
            error["email"] = "Please provide a valid email"
        elif Users.query.filter_by(email=email).first():
            error["email"] = "Please use a different email"
        else:
            user["email"] = email

        if not password:
            error["password"] = "Please provide a password"
        elif len(password) < 8:
            error["password"] = "Please provide a longer password"
        elif not username.isalnum():
            error["password"] = "Please use alphanumeric characters"
        else:
            user["password"] = password

        if not confirm:
            error["confirm"] = "Please confirm password"
        elif not username.isalnum():
            error["confirm"] = "Please use alphanumeric characters"
        elif password:
            if password != confirm:
                error["confirm"] = "Please make sure passwords match"
            elif not (len(password) < 8):
                user["confirm"] = confirm
        else:
            user["confirm"] = confirm

        if all(value != "" for value in user.values()) and all(not value for value in error.values()):

            user = Users(email=email, name=name,
                         password=generate_password_hash(password, method="sha256"))

            db.session.add(user)
            db.session.commit()

            return redirect(url_for('auth.login')), 302

    return render_template("register.html", error=error, user=user), 200


@auth.route('/logout', methods=["GET"])
def logout():
    return redirect(url_for('main.index')), 302
