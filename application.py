from flask import Flask
from flask_session import Session
from flask_login import LoginManager
import config
from models import *


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Development')
    login_manager = LoginManager()

    with app.app_context():
        db.init_app(app)
        login_manager.init_app(app)
        Session(app)

    from main import main
    app.register_blueprint(main)

    from auth import auth
    app.register_blueprint(auth)

    return(app)


app = create_app()
