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
    fsurl = db.Column(db.String(100), nullable=False)
    fsvideo = db.Column(db.String(1000), nullable=True)
    fsfoto = db.Column(db.String(1000), nullable=True)
    fsdescripcion = db.Column(db.String(100), nullable=False)
    fssubtitulo = db.Column(db.String(100), nullable=False)
    fscuerpo = db.Column(db.String(10000), nullable=False)
    fscode = db.Column(db.String(10000), nullable=True)
    fscreatedate = db.Column(db.DateTime, default=datetime.now())

    def serialize(self):
        return {
            "id": self.id,
            "fstitulo": self.fstitulo,
            "fsurl": self.fsurl,
            "fsvideo": self.fsvideo,
            "fsfoto": self.fsfoto,
            "fsdescripcion": self.fsdescripcion,
            "fssubtitulo": self.fssubtitulo,
            "fscuerpo": self.fscuerpo,
            "fscode": self.fscode,
            "fscreatedate": self.fscreatedate,
        }

class Icomblog (db.Model):
    __tablename__ = 'icomblog'
    id = db.Column(db.Integer, primary_key=True)
    icomtitulo = db.Column(db.String(100), nullable=False)
    icomurl = db.Column(db.String(100), nullable=False)
    icomvideo = db.Column(db.String(1000), nullable=True)
    icomfoto = db.Column(db.String(1000), nullable=True)
    icomdescripcion = db.Column(db.String(100), nullable=False)
    icomsubtitulo = db.Column(db.String(100), nullable=False)
    icomcuerpo = db.Column(db.String(10000), nullable=False)
    icomcode = db.Column(db.String(10000), nullable=True)
    icomcreatedate = db.Column(db.DateTime, default=datetime.now())

    def serialize(self):
        return {
            "id": self.id,
            "icomtitulo": self.icomtitulo,
            "icomurl": self.icomurl,
            "icomvideo": self.icomvideo,
            "icomfoto": self.icomfoto,
            "icomdescripcion": self.icomdescripcion,
            "icomsubtitulo": self.icomsubtitulo,
            "icomcuerpo": self.icomcuerpo,
            "icomcode": self.icomcode,
            "icomcreatedate": self.icomcreatedate,
        }

class HomeCarousel (db.Model):
    __tablename__ = 'homecarousel'
    id = db.Column(db.Integer, primary_key=True)
    hcimg = db.Column(db.String(100), nullable=False)
    hctitle = db.Column(db.String(100), nullable=False)
    hcp = db.Column(db.String(1000), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "hcimg": self.hcimg,
            "hctitle": self.hctitle,
            "hcp": self.hcp,
        }