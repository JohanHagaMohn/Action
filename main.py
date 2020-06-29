from flask import Blueprint, render_template, redirect, url_for, jsonify, request
from flask_login import login_required, current_user
from models import Users, Branches, Tasks

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
    user = Users.query.filter_by(username=current_user.username).first()
    return render_template("app.html", user=user), 200


@main.route('/app', methods=["POST"])
@login_required
def app_post():
    user = Users.query.filter_by(username=current_user.username).first()
    print(request.json, request.json["task"])
    if request.form.get("goal"):
        user.add_branch(request.form.get("goal"), request.form.get("description"), request.form.get("deadline"))
    elif request.json:
        branch = user.branches.filter_by(branch=request.json["branch"]).first()
        if request.json["task"]:
            branch.add_task(request.json["task"], request.json["duration"])
        else:
            if branch:
                branch.complete()
        return "True", 200
    return redirect(url_for('main.app'))
