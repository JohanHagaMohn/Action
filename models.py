from application import db
from flask_login import UserMixin


class Users(UserMixin, db.Model):
    __tablename__ = "user"
    id = db.Column(db.SmallInteger, primary_key=True, unique=True)
    username = db.Column(db.VARCHAR(32), unique=True, nullable=False)
    email = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    password = db.Column(db.VARCHAR(96), unique=False, nullable=False)
    branches = db.relationship("Branches", backref="Users", lazy="dynamic", cascade = "all, delete, delete-orphan")

    def add_branch(self, branch, description, deadline):
        db.session.add(Branches(user_id=self.id, branch=branch,
                                description=description, deadline=deadline))
        db.session.commit()


class Branches(UserMixin, db.Model):
    __tablename__ = "branch"
    id = db.Column(db.SmallInteger, primary_key=True)
    user_id = db.Column(db.SmallInteger, db.ForeignKey(
        "user.id"), nullable=False, unique=False)
    branch = db.Column(db.VARCHAR(64), unique=False, nullable=False)
    description = db.Column(db.VARCHAR(128), unique=False, nullable=False)
    deadline = db.Column(db.Date, unique=False, nullable=True)
    tasks = db.relationship("Tasks", backref="Branches", lazy="dynamic", cascade = "all, delete, delete-orphan")

    def add_task(self, task, duration):
        db.session.add(Tasks(branch_id=self.id, task=task, duration=duration))
        db.session.commit()
    
    def complete(self):
        db.session.delete(self)
        db.session.commit()


class Tasks(UserMixin, db.Model):
    __tablename__ = "task"
    id = db.Column(db.SmallInteger, primary_key=True)
    branch_id = db.Column(db.SmallInteger, db.ForeignKey(
        "branch.id"), nullable=False, unique=False)
    task = db.Column(db.VARCHAR(32), unique=False, nullable=False)
    duration = db.Column(db.SmallInteger, unique=False, nullable=True)
    complete = db.Column(db.Boolean, unique=False,
                         nullable=False, default=False)

    def complete(self):
        self.complete = True
        db.session.commit()
