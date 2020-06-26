from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Roles (db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    rolename = db.Column(db.String(50), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "rolename": self.rolename
        }

class Users (db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    lastname = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(100), nullable=True, default='defaultavatar.jpg')
    phone = db.Column(db.String(12), nullable=True)
    createdate = db.Column(db.DateTime, default=datetime.now())
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    role = db.relationship(Roles)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "avatar": self.avatar,
            "phone": self.phone,
            "createdate": self.createdate,
            "role": self.role.serialize(),
        }

class Fsblog (db.Model):
    __tablename__ = 'fsblog'
    id = db.Column(db.Integer, primary_key=True)
    fstitulo = db.Column(db.String(100), nullable=False)
    fsvideourl = db.Column(db.String(100), nullable=False)
    fsvideo = db.Column(db.String(1000), nullable=True)
    fsdescripcion = db.Column(db.String(100), nullable=False)
    fssubtitulo = db.Column(db.String(100), nullable=False)
    fscuerpo = db.Column(db.String(10000), nullable=False)
    fscode = db.Column(db.String(10000), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "fstitulo": self.fstitulo,
            "fsvideourl": self.fsvideourl,
            "fsvideo": self.fsvideo,
            "fsdescripcion": self.fsdescripcion,
            "fssubtitulo": self.fssubtitulo,
            "fscuerpo": self.fscuerpo,
            "fscode": self.fscode,
        }