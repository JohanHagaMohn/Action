from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, current_user

main = Blueprint('main', __name__)


@main.route('/', methods=["GET"])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('main.app')), 302
    return render_template("index.html"), 200


@main.route('/about', methods=["GET"])
def about():
    return render_template("about.html"), 200


@main.route('/app', methods=["GET"])
@login_required
def app():
    name = current_user.username
    return render_template("app.html", name=name), 200
