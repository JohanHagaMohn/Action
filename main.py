from flask import Blueprint, render_template
from flask_login import login_required, current_user

main = Blueprint('main', __name__)


@main.route('/', methods=["GET"])
def index():
    return render_template("index.html"), 200


@main.route('/about', methods=["GET"])
def about():
    return render_template("about.html"), 200


@main.route('/app', methods=["GET"])
@login_required
def app():
    name = current_user.username
    return render_template("app.html", name=name), 200
