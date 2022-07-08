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
            (`email`, `password`, `firstname`, `lastname`, `admin`, `reservatieCheck`)
        VALUES
            (:email, :password, :firstname, :lastname, :admin, :reservatieCheck)
    '''

    # Hash the password before inserting
    args['password'] = generate_password_hash(args['password'])

    # Insert the user into the database
    
    try:
        id = DB.insert(qry, args)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');  
                
    # Return a message and the user id
    return {'message': 'success', 'id': id}, 201


@jwt_required()
def create_car():

    args = request.get_json()
    qry = '''
        INSERT INTO
        auto
            (`model`, `brandstof`, `airco`, `automaat`, `aantal_zitplaatsen`, `check`)
        VALUES
            (:model, :brandstof, :airco, :automaat, :aantal_zitplaatsen, :check)
    '''

    data = {
        "model": args["model"],
        "brandstof": args["brandstof"],
        "airco": args["airco"],
        "automaat": args["automaat"],
        "aantal_zitplaatsen": args["aantal_zitplaatsen"],
        "check": "0"
        }
    try:
        id = DB.insert(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
        
    return {'message': 'success', 'id': id}, 201


def show_user():
    # qry om users te laten zien
    qry = '''
    SELECT
         `email`, `password`, `firstname`, `lastname`
         FROM `users`

    '''
    try:
        id = DB.all(qry)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');

    return {'message': 'success', 'id': id}, 201


def show_admin():
    # qry om users te laten zien
    qry = '''

  SELECT reservatie.id AS reservatie_id ,
		auto.brandstof,
		users.id AS user_id,
		users.firstname,
		users.lastname,
		auto.model,
		auto.airco,
		auto.automaat,
		auto.aantal_zitplaatsen,
        reservatie.tijd

FROM reservatie
LEFT JOIN  auto
on reservatie.auto_id = auto.id
LEFT JOIN users
on users.id = reservatie.user_id

ORDER  by reservatie.tijd





    '''
    try:
        model = DB.all(qry)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
        
    print(model)
    return {'message': 'success', 'model': model}, 201


def show_car():
    # qry om users te laten zien
    qry = '''
    SELECT  *
         FROM `auto` where `check` = 0


    '''
    try:
        model = DB.all(qry)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
        
    return {'message': 'success', 'model': model}, 201


def show_car2():
    # qry om users te laten zien
    qry = '''
    SELECT  *
         FROM `auto`


    '''
    try:
        model = DB.all(qry)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
        
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
    try:
        DB.update(qry)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
    return {'message': 'success', }, 201


@jwt_required()
def autoWijzigen():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
    UPDATE auto
SET model = :model, brandstof = :brandstof, airco = :airco ,automaat = :automaat, 
    aantal_zitplaatsen = :aantal_zitplaatsen
WHERE id = :id;


    '''
    
    data = {
        "model": args["model"],
        "brandstof": args["brandstof"],
        "airco": args["airco"],
        "automaat": args["automaat"],
        "aantal_zitplaatsen": args["aantal_zitplaatsen"],
        "id": args["id"]
       
        }
    try:
        model = DB.update(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
    
    return {'message': 'success', 'id': model}, 201

@jwt_required()
def reservatieWijzigen2():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)
    print("SUCCESVOL")

    qry = '''
        UPDATE reservatie SET `check_reservatie` = 1 
    WHERE id= :id

    '''

    data = {

        "id": args["id"]
    }

    model = DB.update(qry, data)

    return {'message': 'success', 'id': model}, 201


@jwt_required()
def reservatieVerwijderen():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
    DELETE FROM reservatie WHERE id = :id;
    '''

    
    data = {
        "id": args["id"]
    
        }
    id = DB.delete(qry, data)

    qry = '''
        UPDATE auto
    SET "check" = 0
    WHERE id = :auto_id
    '''
    try:
        DB.update(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
        
    return {'message': 'success', 'id': id}, 201


@jwt_required()
def reservatieWijzigen():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
    UPDATE reservatie
SET datum = :datum, tijd = :tijd
WHERE id = :id;



    '''
    
    data = {
        "datum": args["datum"],
        "tijd": args["tijd"],
        "id": args["id"]
       
        }
    try:
        model = DB.update(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
    
    return {'message': 'success', 'id': model}, 201


@jwt_required()
def autoVerwijderen():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
    UPDATE auto SET `check` = 1 
    WHERE id= :id


    '''
    data = {
    
        "id": args["id"]
       
        }
    
    model = DB.update(qry,data)
    
    return {'message': 'success', 'id': model}, 201
    



@jwt_required()
def reservatieVerwijderen():
    user = get_jwt_identity()

    args = request.get_json()
    print(user)

    qry = '''
    DELETE FROM reservatie  WHERE id= :id


    '''
    data = {
    
        "id": args["id"]
       
        }
    model = DB.update(qry,data)
   
    
    qry = '''
        UPDATE auto
    SET "check" = 0
    WHERE id = :id
    '''
    try:
        DB.update(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');



    return {'message': 'success', 'id': model}, 201

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

    qry = '''
        UPDATE users
    SET "reservatieCheck" = 1
    WHERE id = :user_id
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
    try:
        reservatie = DB.all(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');
    

    return {'message': 'success', 'reservatie': reservatie}, 201    


@jwt_required()
def show_reservatie1():
    user = get_jwt_identity()
    # qry om users te laten zien
    qry = '''
SELECT reservatie.id AS reservatieID, reservatie.datum, reservatie.tijd , reservatie.user_id, auto.id AS autoID, auto.model
FROM reservatie
inner JOIN auto
on reservatie.auto_id = auto.id
WHERE user_id = :user_id AND reservatie.check_reservatie= 0 AND date('now','+1 day') > creation_date


    '''
    data = {
        "user_id": user["id"]
    }
    try:
        reservatie = DB.all(qry, data)
    except Exception:
        print('Er is een probleem opgetreden, contact de admin.');

    return {'message': 'success', 'reservatie': reservatie}, 201    