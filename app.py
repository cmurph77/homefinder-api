from flask import Flask, send_file,request,jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from ElasticDatabase import ElasticDatabase

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/')
def hello_world():
    return 'Hello, Welcome to the homefinder Server!'

# ---------------- CONNNECTED TO DATABASE -------------------------------------
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


# -------- BELOW HERE NOT CONNNECTED TO THE DATABASE -------------------------------------

@app.route('/like-property/<int:user_id>/<int:property_id>',methods = ['PUT'])

def like_property(user_id,property_id):
    # logic to like property
    return {'message': 'Property liked'}, 200


@app.route('/unlike-property/<int:user_id>/<int:property_id>',methods = ['PUT'])
def unlike_property(user_id,property_id):
    # logic to unlike property
    return {'message': 'Property un-liked'}, 200


# this endpoint takes a user_id and retruns all the data associated with the user
@app.route('/get-user-info/<int:user_id>', methods=['GET'])
def get_user_info(user_id):
    user_info = {
        'name' : 'cian',
        'mesasge' : 'this is an test, not how user object will be formatted'
    }  
    # set user info to the users_info retireved from database
    return user_info , 200

# get a list of properties that are liked by a user
@app.route('/get-users-liked-properties/<int:user_id>', methods=['GET'])
def get_users_liked_properties(user_id,property_id):
    liked_properties = {}  
    # 1. get liked properties
    # 2. return properties as a json object
    return liked_properties , 200

# -------------------------- under development -------------------------------------
app.route('/update-users-liked-properties', methods=['POST'])
def update_users_liked_properties():
    # Extract JSON data from the request
    request_data = request.get_json()

    if 'user_id' not in request_data or 'property_id' not in request_data:
        return jsonify({"error": "Missing user_id or property_id in JSON"}), 400

    user_id = request_data['user_id']
    updated_liked_properties = request_data['updated_liked properties']

    # Your logic to update liked based on user_id and property_id

    # Return properties as a JSON object
    return jsonify({"message": "liked properties updated",
                    "updated_liked_properties" : updated_liked_properties })
  
# this endpoint takes a user_id and retruns all the data associated with the user
@app.route('/update-users-info', methods=['POST'])
def update_user_info(user_id):
    request_data = request.get_json()
    user_id = request_data['user_id']
    user_data = request_data['user_data']

    # logic to update the user data in database
    return { 'message': 'successfully updated'}, 200

        

    



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
    
# Tries to return liked property values if found
@app.route('/get-liked-properties/<string:user_id>', methods=['GET'])
def get_liked_properties(user_id):
    liked_propertyIDs = ElasticDatabase.searchUserLikedProperties(user_id) #Try YSixicUz for debug
    #liked_propertyIDs = []     DEBUG
    if liked_propertyIDs: 
        print(liked_propertyIDs)
        liked_properties = ElasticDatabase.searchPropertyList(liked_propertyIDs)
        if liked_properties:
            return liked_properties, 200
        else:
            return {'error': 'Liked property IDs not found'}, 404
    
    elif liked_propertyIDs == []:
        return json.dumps(liked_propertyIDs), 200
    else:
        return {'error': 'User liked properties not found'}, 404

