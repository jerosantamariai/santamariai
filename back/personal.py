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

def loadadmin():
    users = Users()
    users.email = "jero@santamariai.cl"
    users.password = bcrypt.generate_password_hash("123456")
    users.role_id = "1"

    db.session.add(users)
    db.session.commit()

    print("Administrador is made!")