from flask import Flask, send_file
from flask_cors import CORS
from datetime import datetime
import os
from ElasticDatabase import ElasticDatabase

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/')
def hello_world():
    return 'Hello, Welcome to the homefinder Server!'


# This returns a property object of the given 'id'
@app.route('/get-property-by-id-live/<int:property_id>', methods=['GET'])
def get_property(property_id):
    current_time = datetime.now()
    print("GET REQ - /get-property-by-id  id:"+ str(property_id)+"   @ [" + str(current_time) + "]")
    property_data = ElasticDatabase.searchByPropertyID(property_id)
    if property_data:
        return property_data
    else:
        return {'error': 'Property not found'}, 404


# This returns a list of propertys that should be ont he specified pagenum
@app.route('/get-propertys-by-pagenum-live/<int:pagenum>/<int:numresults>', methods=['GET'])
def get_propertys_pagesize(pagenum,numresults):
    current_time = datetime.now()
    print("GET REQ - /get-propertys-by-pagenum  pagenum: " +str(pagenum) + ", pagesize:" +str(numresults)+" @ [" + str(current_time) + "]")
    data = ElasticDatabase.search(numresults,pagenum)
    return data

@app.route('/like-property/<int:user_id>/<int:property_id>',methods = ['POST'])
def like_property(user_id,property_id):
    # logic to like property
    return {'message': 'Property liked'}, 200

@app.route('/unlike-property/<int:user_id>/<int:property_id>',methods = ['POST'])
def unlike_property(user_id,property_id):
    # logic to unlike property
    return {'message': 'Property liked'}, 200

# -------------- Returning Sample Data

# This is a sample call that just returns the example-data as it would acctually be rrturned from the database
@app.route('/get-users-liked-properties-sample/<int:user_id>/<int:property_id>', methods=['GET'])
def get_users_liked_properties(user_id,property_id):
    #  currently returns a sample json of a list of properties 
    propertyObjectPath = os.path.join(os.getcwd(), 'mock_data','ExampleJSONs', 'FieldSearch50ByRentExample.json')

    # Check if the file exists
    if os.path.exists(propertyObjectPath):
        # Return the JSON file
        return send_file(propertyObjectPath, mimetype='application/json')
    else:
        # Return an error message if the file does not exist
        return {'error': 'json file not found'}, 404

        

# This is a sample call that just returns the example-data as it would acctually be rrturned from the database
# the word 'sample' is at the end to make it clear, when the real enpoints are working it should be simple to change from 'sample' to 'live'
@app.route('/get-propertys-by-pagenum-sample/<int:pagenum>/<int:numresults>', methods=['GET'])
def get_propertys_pagesize_sample(pagenum,numresults):
    current_time = datetime.now()
    print("GET REQ - /get-propertys-by-pagenum-sample  pagenum: " +str(pagenum) + ", pagesize:" +str(numresults)+" @ [" + str(current_time) + "]")

    fieldSearchPath = os.path.join(os.getcwd(), 'mock_data','ExampleJSONs', 'FieldSearch50ByRentExample.json')

    # Check if the file exists
    if os.path.exists(fieldSearchPath):
        # Return the JSON file
        return send_file(fieldSearchPath, mimetype='application/json')
    else:
        # Return an error message if the file does not exist
        return {'error': 'json file not found'}, 404
    

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


# This is a sample call that just returns the example-data as it would acctually be rrturned from the database
@app.route('/get-property-by-id-sample/<int:property_id>', methods=['GET'])
def get_property_sample(property_id):
    current_time = datetime.now()
    print("GET REQ - /get-property-by-id-sample  id:"+ str(property_id)+"   @ [" + str(current_time) + "]")
    
    propertyObjectPath = os.path.join(os.getcwd(), 'mock_data','ExampleJSONs', 'searchByIDExample.json')

    # Check if the file exists
    if os.path.exists(propertyObjectPath):
        # Return the JSON file
        return send_file(propertyObjectPath, mimetype='application/json')
    else:
        # Return an error message if the file does not exist
        return {'error': 'json file not found'}, 404