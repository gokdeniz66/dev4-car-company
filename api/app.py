from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from db import DB
from resources.user import create_user, show_user, show_car, reservatiePosten, show_reservatie, reservatieVerwijderen, show_admin, create_car, show_car2, autoWijzigen, autoVerwijderen, show_reservatie1, reservatieWijzigen, reservatieWijzigen2, reservatieVerwijderen
from security import login, me


# Create a new Flask application
app = Flask(__name__)
app.debug = True

# Enable cors on the server
CORS(app)

# Register the JWT manager

app.config['JWT_SECRET_KEY'] = 'super-secret' # Change this!
jwt = JWTManager(app)

# ============================ Routes ============================

# JWT routes
reservatieWijzigen

app.add_url_rule('/users', None, create_user, methods=['POST'])
app.add_url_rule('/auth', None, login, methods=['POST'])
app.add_url_rule('/me', None, me, methods=['GET'])
app.add_url_rule('/users', None, show_user, methods=['GET'])
app.add_url_rule('/carr', None, show_car2, methods=['GET'])
app.add_url_rule('/car', None, autoWijzigen, methods=['PATCH'])
app.add_url_rule('/carr', None, autoVerwijderen, methods=['PATCH'])
app.add_url_rule('/car', None, show_car, methods=['GET'])
app.add_url_rule('/reservatie', None, show_reservatie, methods=['GET'])
app.add_url_rule('/reservatie1', None, show_reservatie1, methods=['GET'])
app.add_url_rule('/reservatie', None, reservatieWijzigen, methods=['PATCH'])
app.add_url_rule('/reservatie2', None, reservatieWijzigen2, methods=['PATCH'])
app.add_url_rule('/reservatie', None, reservatieVerwijderen, methods=['DELETE'])
app.add_url_rule('/reservatie', None, reservatiePosten, methods=['POST'])
app.add_url_rule('/admin', None, show_admin, methods=['GET'])
app.add_url_rule('/car', None, create_car, methods=['POST'])






# Start app
if __name__ == '__main__':
    DB.create()
    app.run()
    
    