from flask import Flask, send_file
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

import os

@app.route('/')
def hello_world():
    return 'Hello, Welcome to the homefinder Server!'

# this endpoint returns the dummy-data.json file
@app.route('/dummydata-properties', methods=['GET'])
def get_properties():
    current_time = datetime.now()
    print("GET REQ - /dummydata-properties   @ [" + str(current_time) + "]")
    # Define the path to the properties.json file
    properties_path = os.path.join(os.getcwd(), 'mock_data', 'dummy-data.json')
    
    # Check if the file exists
    if os.path.exists(properties_path):
        # Return the JSON file
        return send_file(properties_path, mimetype='application/json')
    else:
        # Return an error message if the file does not exist
        return {'error': 'properties.json file not found'}, 404


@app.route('/get-property-by-id/<int:user_id>', methods=['GET'])
def get_user(user_id):
    print(user_id)
    return {
            "id": "  ",
            "address": "Samle Property",
            "rent per month": 0,
            "daft.ie link": "  ",
            "latitude": 53.341833017884795,
            "longitude": -6.288615427057721,
            "property-type": {
                "category": "  ",
                "type": [
                    "  ",
                    "  ",
                    "  "
                ],
                "bed": "  ",
                "bath": "  ",
                "m2": "N/A"
            }
        }



