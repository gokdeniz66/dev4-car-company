from flask import request
from flask_bcrypt import generate_password_hash
from db import DB
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity
)
from datetime import date

def create_user():
    # Parse all arguments for validity
    args = request.get_json()

    # Make the insert query with parameters
    qry = '''
    INSERT INTO
        `users`
            (`email`, `password`, `firstname`, `lastname`)
        VALUES
            (:email, :password, :firstname, :lastname)
    '''

    # Hash the password before inserting
    args['password'] = generate_password_hash(args['password'])

    # Insert the user into the database
    id = DB.insert(qry, args)

    # Return a message and the user id
    return {'message': 'success', 'id': id}, 201


def show_user():
    # qry om users te laten zien
    qry = '''
    SELECT
         `email`, `password`, `firstname`, `lastname`
         FROM `users`

    '''

    id = DB.all(qry)

    return {'message': 'success', 'id': id}, 201


def show_car():
    # qry om users te laten zien
    qry = '''
    SELECT  *
         FROM `auto` where `check` = 0


    '''
#         SELECT *
# FROM auto
# INNER JOIN reservatie
# ON auto.id = reservatie.auto_id
# WHERE check_reservatie = 0

    model = DB.all(qry)

    return {'message': 'success', 'model': model}, 201


@jwt_required()
def reservatieVerwijderen():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
        UPDATE reservatie
    SET "reservatie.check_reservatie" = 1
    WHERE id = :reservatie.id
    '''
    DB.update(qry)
    return {'message': 'success',}, 201





@jwt_required()
def reservatiePosten():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
    INSERT INTO
        `reservatie`
            (`tijd`, `datum`, `auto_id`, `leveren`, `user_id`, `creation_date`, `check_reservatie`)
        VALUES
            (:tijd, :datum, :auto_id, :leveren, :user_id, :creation_date, :check_reservatie)
    '''

    
    data = {
        "tijd": args["tijd"],
        "datum": args["datum"],
        "auto_id": args["auto_id"],
        "leveren": args["leveren"],
        "user_id": user["id"],
        "creation_date": date.today(),
        "check_reservatie": "0"
        }
    id = DB.insert(qry, data)

    qry = '''
        UPDATE auto
    SET "check" = 1
    WHERE id = :auto_id
    '''
    DB.update(qry, data)
    return {'message': 'success', 'id': id}, 201


@jwt_required()
def show_reservatie():
    user = get_jwt_identity()
    # qry om users te laten zien
    qry = '''
 SELECT *
FROM reservatie
inner JOIN auto
on reservatie.auto_id = auto.id
WHERE user_id = :user_id AND reservatie.check_reservatie= 0 AND date('now','+1 day') > creation_date


    '''
    data = {
        "user_id": user["id"]
    }
    reservatie = DB.all(qry, data)
    

    return {'message': 'success', 'reservatie': reservatie}, 201    