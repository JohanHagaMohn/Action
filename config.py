from os import getenv, urandom
from tempfile import mkdtemp


class Development():
    DEBUG = True
    TESTING = True
    DEVELOPMENT = True
    SECRET_KEY = 'dev'
    TEMPLATES_AUTO_RELOAD = True
    SESSION_FILE_DIR = mkdtemp()
    SESSION_PERMANENT = False
    SESSION_TYPE = "filesystem"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL")


class Production(Development):
    DEBUG = False
    TESTING = False
    DEVELOPMENT = False
    SECRET_KEY = urandom(16)
