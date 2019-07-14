from flask import Blueprint, render_template, redirect, url_for

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["GET"])
def login():
    return render_template("login.html"), 200


@auth.route('/login', methods=["POST"])
def login_post():
    return render_template("login.html"), 200


@auth.route('/register', methods=["GET"])
def register():
    return render_template("register.html"), 200


@auth.route('/register', methods=["POST"])
def register_post():
    return render_template("register.html"), 200


@auth.route('/logout', methods=["GET"])
def logout():
    return redirect(url_for('main.index')), 302
