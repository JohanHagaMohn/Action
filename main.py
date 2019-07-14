from flask import Blueprint, render_template

main = Blueprint('main', __name__)


@main.route('/', methods=["GET"])
def index():
    return render_template("index.html"), 200


@main.route('/about', methods=["GET"])
def about():
    return render_template("about.html"), 200
