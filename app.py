from flask import Flask, send_file
app = Flask(__name__)
import os


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/dummydata-properties', methods=['GET'])
def get_properties():
    print("RECIEVED REQUEST FOR PROPERTY DATA")
    # Define the path to the properties.json file
    properties_path = os.path.join(os.getcwd(), 'mock_data', 'properties.json')
    
    # Check if the file exists
    if os.path.exists(properties_path):
        # Return the JSON file
        return send_file(properties_path, mimetype='application/json')
    else:
        # Return an error message if the file does not exist
        return {'error': 'properties.json file not found'}, 404


