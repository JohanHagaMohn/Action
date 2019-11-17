from flask import Flask, render_template
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

from werkzeug.exceptions import default_exceptions, HTTPException

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    from config import Development
    app.config.from_object(Development)

    db.init_app(app)

    from models import Users, Branches, Tasks

    with app.app_context():
        db.drop_all()
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return Users.query.get(int(user_id))

    from main import main
    app.register_blueprint(main)

    from auth import auth
    app.register_blueprint(auth)

    return(app)


app = create_app()


def errorhandler(e):
    template = "404" if e.code == 404 else "serverError" if not isinstance(
        e, HTTPException) else "htmlError"
    return render_template(f"{template}.html"), e.code


for code in default_exceptions:
    app.errorhandler(code)(errorhandler)


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response
