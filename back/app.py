import os  
from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, Roles, Users, Fsblog, Icomblog, HomeCarousel
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
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost:3306/db'
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
        return jsonify({"msg": "Formato invalido!"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or email == '':
        return jsonify({"msg": "Ingresa un correo valido!"}), 400
    if not password or password == '':
        return jsonify({"msg": "Ingresa un password!"}), 400

    users = Users.query.filter_by(email=email).first()
    if users:
        return jsonify({"msg": "Usuario ya existe!"}), 400

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
                return jsonify({"msg": "Usuario no encontrado :("}), 404
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
            return jsonify({"msg":"Ingresa tu nombre!"}), 400
        if not lastname or lastname == "":
            return jsonify({"msg":"Ingresa tu apellido!"}), 400
        if not phone or phone == "":
            return jsonify({"msg":"Ingresa tu telefono!"}), 400
        if not email or email == "":
            return jsonify({"msg":"Confirma tu email!"}), 400

        users = Users.query.get(id)
        if not users:
            return jsonify({"msg": "No encontrado"}), 404
         
        users.name = name 
        users.lastname = lastname 
        users.phone = phone
        users.email = email
        
        db.session.commit()  

        return jsonify(users.serialize()), 201

    if request.method == 'DELETE':
        users = Users.query.get(id)
        if not users:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        db.session.delete(users)
        db.session.commit()
        return jsonify({"msg":"Usuario borrado!"}), 200

@app.route('/fsblog', methods=['GET', 'POST'])
@app.route('/fsblog/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required
def fsblog(id = None):
    if request.method == 'GET':
        if id is not None:
            fsblog = Fsblog.query.get(id)
            if fsblog:
                return jsonify(fsblog.serialize()), 200
            else:
                return jsonify({"msg": "Full Stack Blog no encontrado"}), 404
        else:
            fsblogs = Fsblog.query.all()
            fsblogs = list(map(lambda fsblog: fsblog.serialize(), fsblogs))
            return jsonify(fsblogs), 200

    if request.method == 'POST':
        fstitulo = request.json.get('fstitulo', None)
        fsurl = request.json.get('fsurl', None)
        fsvideo = request.json.get('fsvideo', None)
        fsfoto = request.json.get('fsfoto', None)
        fsdescripcion = request.json.get('fsdescripcion', None)
        fssubtitulo = request.json.get('fssubtitulo', None)
        fscuerpo = request.json.get('fscuerpo', None)
        fscode = request.json.get('fscode', None)
        
        fsblog = Fsblog()
        
        fsblog.fstitulo = fstitulo
        fsblog.fsurl = fsurl
        fsblog.fsvideo = fsvideo
        fsblog.fsfoto = fsfoto
        fsblog.fsdescripcion = fsdescripcion
        fsblog.fssubtitulo = fssubtitulo
        fsblog.fscuerpo = fscuerpo
        fsblog.fscode = fscode
        
        db.session.add(fsblog) 
        db.session.commit()  

        return jsonify(fsblog.serialize()), 201
    
    if request.method == 'PUT':
        fstitulo = request.json.get('fstitulo', None)
        fsurl = request.json.get('fsurl', None)
        fsvideo = request.json.get('fsvideo', None)
        fsfoto = request.json.get('fsfoto', None)
        fsdescripcion = request.json.get('fsdescripcion', None)
        fssubtitulo = request.json.get('fssubtitulo', None)
        fscuerpo = request.json.get('fscuerpo', None)
        fscode = request.json.get('fscode', None)

        fsblog = Fsblog.query.get(id)
        if not fsblog:
            return jsonify({"msg": "Blog no encontrado"}), 404
         
        fsblog.fstitulo = fstitulo
        fsblog.fsurl = fsurl
        fsblog.fsvideo = fsvideo
        fsblog.fsfoto = fsfoto
        fsblog.fsdescripcion = fsdescripcion
        fsblog.fssubtitulo = fssubtitulo
        fsblog.fscuerpo = fscuerpo
        fsblog.fscode = fscode
        
        db.session.commit()  

        return jsonify(fsblog.serialize()), 201

    if request.method == 'DELETE':
        fsblog = Fsblog.query.get(id)
        if not fsblog:
            return jsonify({"msg": "Blog no encontrado"}), 404
        db.session.delete(fsblog)
        db.session.commit()
        return jsonify({"msg":"Blog borrado!"}), 200

@app.route('/icomblog', methods=['GET', 'POST'])
@app.route('/icomblog/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required
def icomblog(id = None):
    if request.method == 'GET':
        if id is not None:
            icomblog = Icomblog.query.get(id)
            if icomblog:
                return jsonify(icomblog.serialize()), 200
            else:
                return jsonify({"msg": "ICOM Blog no encontrado"}), 404
        else:
            icomblogs = Icomblog.query.all()
            icomblogs = list(map(lambda icomblog: icomblog.serialize(), icomblogs))
            return jsonify(icomblogs), 200

    if request.method == 'POST':
        icomtitulo = request.json.get('icomtitulo', None)
        icomurl = request.json.get('icomurl', None)
        icomvideo = request.json.get('icomvideo', None)
        icomfoto = request.json.get('icomfoto', None)
        icomdescripcion = request.json.get('icomdescripcion', None)
        icomsubtitulo = request.json.get('icomsubtitulo', None)
        icomcuerpo = request.json.get('icomcuerpo', None)
        icomcode = request.json.get('icomcode', None)
        
        icomblog = Icomblog()
        
        icomblog.icomtitulo = icomtitulo
        icomblog.icomurl = icomurl
        icomblog.icomvideo = icomvideo
        icomblog.icomfoto = icomfoto
        icomblog.icomdescripcion = icomdescripcion
        icomblog.icomsubtitulo = icomsubtitulo
        icomblog.icomcuerpo = icomcuerpo
        icomblog.icomcode = icomcode
        
        db.session.add(icomblog) 
        db.session.commit()  

        return jsonify(icomblog.serialize()), 201
    
    if request.method == 'PUT':
        icomtitulo = request.json.get('icomtitulo', None)
        icomurl = request.json.get('icomurl', None)
        icomvideo = request.json.get('icomvideo', None)
        icomfoto = request.json.get('icomfoto', None)
        icomdescripcion = request.json.get('icomdescripcion', None)
        icomsubtitulo = request.json.get('icomsubtitulo', None)
        icomcuerpo = request.json.get('icomcuerpo', None)
        icomcode = request.json.get('icomcode', None)

        icomblog = Icomblog.query.get(id)
        if not icomblog:
            return jsonify({"msg": "Blog no encontrado"}), 404
         
        icomblog.icomtitulo = icomtitulo
        icomblog.icomurl = icomurl
        icomblog.icomvideo = icomvideo
        icomblog.icomfoto = icomfoto
        icomblog.icomdescripcion = icomdescripcion
        icomblog.icomsubtitulo = icomsubtitulo
        icomblog.icomcuerpo = icomcuerpo
        icomblog.icomcode = icomcode
        
        db.session.commit()  

        return jsonify(icomblog.serialize()), 201

    if request.method == 'DELETE':
        icomblog = Icomblog.query.get(id)
        if not icomblog:
            return jsonify({"msg": "Blog no encontrado"}), 404
        db.session.delete(icomblog)
        db.session.commit()
        return jsonify({"msg":"Blog borrado!"}), 200

@app.route('/homecarousel', methods=['GET', 'POST'])
@app.route('/homecarousel/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# @jwt_required
def homecarousel(id = None):
    if request.method == 'GET':
        if id is not None:
            hc = HomeCarousel.query.get(id)
            if icomblog:
                return jsonify(hc.serialize()), 200
            else:
                return jsonify({"msg": "Información del Carousel no encontrado"}), 404
        else:
            hcs = HomeCarousel.query.all()
            hcs = list(map(lambda hc: hc.serialize(), hcs))
            return jsonify(hcs), 200

    if request.method == 'POST':
        hcimg = request.json.get('hcimg', None)
        hctitle = request.json.get('hctitle', None)
        hcp = request.json.get('hcp', None)
        
        hcs = HomeCarousel()
        
        hcs.hcimg = hcimg
        hcs.hctitle = hctitle
        hcs.hcp = hcp
        
        db.session.add(hcs) 
        db.session.commit()  

        return jsonify(hcs.serialize()), 201
    
    if request.method == 'PUT':
        hcimg = request.json.get('hcimg', None)
        hctitle = request.json.get('hctitle', None)
        hcp = request.json.get('hcp', None)

        hcs = HomeCarousel.query.get(id)
        if not hcs:
            return jsonify({"msg": "Item de Carousel no encontrado"}), 404
         
        hcs.hcimg = hcimg
        hcs.hctitle = hctitle
        hcs.hcp = hcp
        
        db.session.commit()  

        return jsonify(hcs.serialize()), 201

    if request.method == 'DELETE':
        hc = HomeCarousel.query.get(id)
        if not hc:
            return jsonify({"msg": "Item no encontrado"}), 404
        db.session.delete(hc)
        db.session.commit()
        return jsonify({"msg":"Item borrado!"}), 200

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

    print("Roles creados")

@manager.command
def loadfsblog():
    fsblog = Fsblog()
    fsblog.fscode = "Code del Primer blog"
    fsblog.fscuerpo = "Cuerpo del Primer blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Primer blog"
    fsblog.fssubtitulo = "Subtitulo del Primer blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Primer Blog"
    fsblog.fsurl = "Primer_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    fsblog = Fsblog()
    fsblog.fscode = "Code del Segundo blog"
    fsblog.fscuerpo = "Cuerpo del Segundo blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Segundo blog"
    fsblog.fssubtitulo = "Subtitulo del Segundo blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Segundo Blog"
    fsblog.fsurl = "segundo_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    fsblog = Fsblog()
    fsblog.fscode = "Code del Tercer blog"
    fsblog.fscuerpo = "Cuerpo del Tercer blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Tercer blog"
    fsblog.fssubtitulo = "Subtitulo del Tercer blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Tercer Blog"
    fsblog.fsurl = "tercer_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    fsblog = Fsblog()
    fsblog.fscode = "Code del Cuarto blog"
    fsblog.fscuerpo = "Cuerpo del Cuarto blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Cuarto blog"
    fsblog.fssubtitulo = "Subtitulo del Cuarto blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Cuarto Blog"
    fsblog.fsurl = "cuarto_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    fsblog = Fsblog()
    fsblog.fscode = "Code del Quinto blog"
    fsblog.fscuerpo = "Cuerpo del Quinto blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Quinto blog"
    fsblog.fssubtitulo = "Subtitulo del Quinto blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Quinto Blog"
    fsblog.fsurl = "quinto_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    fsblog = Fsblog()
    fsblog.fscode = "Code del Sexto blog"
    fsblog.fscuerpo = "Cuerpo del Sexto blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Sexto blog"
    fsblog.fssubtitulo = "Subtitulo del Sexto blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Sexto Blog"
    fsblog.fsurl = "sexto_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    fsblog = Fsblog()
    fsblog.fscode = "Code del Septimo blog"
    fsblog.fscuerpo = "Cuerpo del Septimo blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    fsblog.fsdescripcion = "Descripcion del Septimo blog"
    fsblog.fssubtitulo = "Subtitulo del Septimo blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    fsblog.fstitulo = "Septimo Blog"
    fsblog.fsurl = "septimo_blog"
    fsblog.fsvideo = "Btlnfhh-Gac"
    fsblog.fsfoto = "https://picsum.photos/300/400"

    db.session.add(fsblog)
    db.session.commit()

    print("Agregados los blog de prueba de fs")

@manager.command
def loadicomblog():
    icomblog = Icomblog()
    icomblog.icomcode = "Code del Primer blog"
    icomblog.icomcuerpo = "Cuerpo del Primer blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Primer blog"
    icomblog.icomsubtitulo = "Subtitulo del Primer blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Primer Blog"
    icomblog.icomurl = "Primer_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    icomblog = Icomblog()
    icomblog.icomcode = "Code del Segundo blog"
    icomblog.icomcuerpo = "Cuerpo del Segundo blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Segundo blog"
    icomblog.icomsubtitulo = "Subtitulo del Segundo blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Segundo Blog"
    icomblog.icomurl = "segundo_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    icomblog = Icomblog()
    icomblog.icomcode = "Code del Tercer blog"
    icomblog.icomcuerpo = "Cuerpo del Tercer blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Tercer blog"
    icomblog.icomsubtitulo = "Subtitulo del Tercer blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Tercer Blog"
    icomblog.icomurl = "tercer_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    icomblog = Icomblog()
    icomblog.icomcode = "Code del Cuarto blog"
    icomblog.icomcuerpo = "Cuerpo del Cuarto blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Cuarto blog"
    icomblog.icomsubtitulo = "Subtitulo del Cuarto blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Cuarto Blog"
    icomblog.icomurl = "cuarto_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    icomblog = Icomblog()
    icomblog.icomcode = "Code del Quinto blog"
    icomblog.icomcuerpo = "Cuerpo del Quinto blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Quinto blog"
    icomblog.icomsubtitulo = "Subtitulo del Quinto blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Quinto Blog"
    icomblog.icomurl = "quinto_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    icomblog = Icomblog()
    icomblog.icomcode = "Code del Sexto blog"
    icomblog.icomcuerpo = "Cuerpo del Sexto blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Sexto blog"
    icomblog.icomsubtitulo = "Subtitulo del Sexto blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Sexto Blog"
    icomblog.icomurl = "sexto_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    icomblog = Icomblog()
    icomblog.icomcode = "Code del Septimo blog"
    icomblog.icomcuerpo = "Cuerpo del Septimo blog. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    icomblog.icomdescripcion = "Descripcion del Septimo blog"
    icomblog.icomsubtitulo = "Subtitulo del Septimo blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icomblog.icomtitulo = "Septimo Blog"
    icomblog.icomurl = "septimo_blog"
    icomblog.icomvideo = "Btlnfhh-Gac"
    icomblog.icomfoto = "https://picsum.photos/300/400"

    db.session.add(icomblog)
    db.session.commit()

    print("Agregados los blog de prueba de icom")

@manager.command
def loadhc():
    hc = HomeCarousel()
    hc.hcimg = "https://picsum.photos/id/63/200/300"
    hc.hcp = "Contenido del primer post"
    hc.hctitle = "Primer Post"

    db.session.add(hc)
    db.session.commit()

    hc = HomeCarousel()
    hc.hcimg = "https://picsum.photos/id/6/200/300"
    hc.hcp = "Contenido del segundo post"
    hc.hctitle = "Segundo Post"

    db.session.add(hc)
    db.session.commit()

    hc = HomeCarousel()
    hc.hcimg = "https://picsum.photos/id/1/200/300"
    hc.hcp = "Contenido del tercer post"
    hc.hctitle = "Tercer Post"

    db.session.add(hc)
    db.session.commit()

    print("HC creados")

@manager.command
def loadadmin():
    users = Users()
    users.email = "jero@santamariai.cl"
    users.password = bcrypt.generate_password_hash("123456")        #Its obviously the first change that I make into my webpage is to change this password of my account
    users.role_id = "1"

    db.session.add(users)
    db.session.commit()

    print("Hola Jero! Volviste! Buena suerte programando!")


if __name__ == '__main__':
    manager.run()