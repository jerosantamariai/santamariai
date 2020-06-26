import os  
from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, Roles, Users, Fsblog
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from functions import allowed_file
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
ALLOWED_EXTENSIONS_IMAGES = {'png', 'jpg', 'jpeg', 'gif', 'svg'}

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['DEBUG '] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'jerosantamariai@gmail.com' #La cuenta de correo electronico de donde saldran los correos
app.config['MAIL_PASSWORD'] = ''
app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'static')
jwt = JWTManager(app)

db.init_app(app)

Migrate(app, db)
CORS(app)
bcrypt = Bcrypt(app)
mail = Mail(app)
manager = Manager(app)
manager.add_command("db", MigrateCommand)

@app.route("/")
def root():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "The number is not correct"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    

    if not email or email == '':
        return jsonify({"msg": "email / password invalid"}), 400
    if not password or password == '':
        return jsonify({"msg": "email / password invalid"}), 400

    users = Users.query.filter_by(email=email).first()
    if not users:
        return jsonify({"msg": "Ops! Try again"}), 401

    if bcrypt.check_password_hash(users.password, password):
        access_token = create_access_token(identity=users.email)
        data = {
            "access_token": access_token,
            "users": users.serialize()
        }
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Ops! Try again"}), 401

@app.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Invalid format"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or email == '':
        return jsonify({"msg": "ERROR: Enter correct mail"}), 400
    if not password or password == '':
        return jsonify({"msg": "ERROR: Enter correct password"}), 400

    users = Users.query.filter_by(email=email).first()
    if users:
        return jsonify({"msg": "ERROR: Username all ready exist"}), 400

    users = Users()
    users.email = email
    users.password = bcrypt.generate_password_hash(password)
    users.role_id = 2

    db.session.add(users)
    db.session.commit()

    access_token = create_access_token(identity=users.email)
    data = {
        "access_token": access_token,
        "users": users.serialize()
    }

    return jsonify(data), 201

@app.route('/users', methods=['GET', 'POST'])
@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required
def users(id = None):
    if request.method == 'GET':
        if id is not None:
            user = Users.query.get(id)
            if user:
                return jsonify(user.serialize()), 200
            else:
                return jsonify({"msg": "Username not exist"}), 404
        else:
            users = Users.query.all()
            users = list(map(lambda user: user.serialize(), users))
            return jsonify(users), 200

    if request.method == 'POST':
        name = request.json.get('name', None)
        lastname = request.json.get('lastname', None)
        phone = request.json.get('phone', None)
        email = request.json.get('email', None)
        
        users = Users()
        
        users.name = name 
        users.lastname = lastname 
        users.phone = phone
        users.email = email
        
        db.session.add(users) 
        db.session.commit()  

        return jsonify(users.serialize()), 201
    
    if request.method == 'PUT':
        name = request.json.get('name', None)
        lastname = request.json.get('lastname', None)
        phone = request.json.get('phone', None)
        email = request.json.get('email', None)

        if not name or name == "":
            return jsonify({"msg":"Insert your name"}), 400
        if not lastname or lastname == "":
            return jsonify({"msg":"Insert your lastname"}), 400
        if not phone or phone == "":
            return jsonify({"msg":"Insert your phone"}), 400
        if not email or email == "":
            return jsonify({"msg":"Confirm your email"}), 400

        users = Users.query.get(id)
        if not users:
            return jsonify({"msg": "Not Found"}), 404
         
        users.name = name 
        users.lastname = lastname 
        users.phone = phone
        users.email = email
        
        db.session.commit()  

        return jsonify(users.serialize()), 201

    if request.method == 'DELETE':
        users = Users.query.get(id)
        if not users:
            return jsonify({"msg": "User not found"}), 404
        db.session.delete(users)
        db.session.commit()
        return jsonify({"msg":"You delete the User"}), 200

@app.route('/users', methods=['GET', 'POST'])
@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required
def users(id = None):
    if request.method == 'GET':
        if id is not None:
            user = Users.query.get(id)
            if user:
                return jsonify(user.serialize()), 200
            else:
                return jsonify({"msg": "Username not exist"}), 404
        else:
            users = Users.query.all()
            users = list(map(lambda user: user.serialize(), users))
            return jsonify(users), 200

    if request.method == 'POST':
        name = request.json.get('name', None)
        lastname = request.json.get('lastname', None)
        phone = request.json.get('phone', None)
        email = request.json.get('email', None)
        
        users = Users()
        
        users.name = name 
        users.lastname = lastname 
        users.phone = phone
        users.email = email
        
        db.session.add(users) 
        db.session.commit()  

        return jsonify(users.serialize()), 201
    
    if request.method == 'PUT':
        name = request.json.get('name', None)
        lastname = request.json.get('lastname', None)
        phone = request.json.get('phone', None)
        email = request.json.get('email', None)

        if not name or name == "":
            return jsonify({"msg":"Insert your name"}), 400
        if not lastname or lastname == "":
            return jsonify({"msg":"Insert your lastname"}), 400
        if not phone or phone == "":
            return jsonify({"msg":"Insert your phone"}), 400
        if not email or email == "":
            return jsonify({"msg":"Confirm your email"}), 400

        users = Users.query.get(id)
        if not users:
            return jsonify({"msg": "Not Found"}), 404
         
        users.name = name 
        users.lastname = lastname 
        users.phone = phone
        users.email = email
        
        db.session.commit()  

        return jsonify(users.serialize()), 201

    if request.method == 'DELETE':
        users = Users.query.get(id)
        if not blog:
            return jsonify({"msg": "User not found"}), 404
        db.session.delete(users)
        db.session.commit()
        return jsonify({"msg":"You delete the User"}), 200

@manager.command
def loadroles():
    role = Roles()
    role.rolename = "admin"

    db.session.add(role)
    db.session.commit()

    role = Roles()
    role.rolename = "customer"

    db.session.add(role)
    db.session.commit()

    print("The rolls are made it")

@manager.command
def loadadmin():
    users = Users()
    users.email = "jero@santamariai.cl"
    users.password = bcrypt.generate_password_hash("123456")        #Its obviously the first change that I make into my webpage is to change this password of my account
    users.role_id = "1"

    db.session.add(users)
    db.session.commit()

    print("Administrador is made!")


if __name__ == '__main__':
    manager.run()