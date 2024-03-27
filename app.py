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


# this endpoint takes a user_id and updates user info
# NEEDS VERIFICATION
@app.route('/update-users-info', methods=['POST'])
def update_user_info(user_id):
    request_data = request.get_json()
    user_id = request_data['user_id']

    # DEBUG 
    #user_id = "YSixicUz"
    #root_dir = os.path.dirname(os.path.abspath(__file__))
    #file_path = os.path.join(root_dir, 'sample.JSON')
    #with open(file_path, 'r')as file:
    #    user_data = json.load(file)

    # logic to update the user data in database
    ElasticDatabase.updateDatabaseUser(userID=user_id, userData=request_data)

    return { 'message': 'successfully updated'}, 200

# Takes json data from frontend accompanied with request in same format as database index send json in body
# NEEDS VERIFICATION !
@app.route('/add-user-to-database/', methods=['POST'])
def create_user():
    try:
        user_data = request.get_json()
        ElasticDatabase.addNewUserToDatabase(user_data)
        return "Success", 200
    except:
        return {'error': 'Could not create user'}, 404
    
# this endpoint takes a user_id and retruns all the data associated with the user
@app.route('/get-user-info/<string:user_id>', methods=['GET'])
def get_user_info(user_id):
    user_info = ElasticDatabase.searchUser(user_id)
    # set user info to the users_info retireved from database
    if user_info == '{}':
        return {'error': 'user info not found'}, 404
    else:
        return user_info , 200

@app.route('/like-property/<string:user_id>/<int:property_id>',methods=['PUT'])
def like_property(user_id,property_id):
    try:
        user_data = ElasticDatabase.searchUser(user_id)
        user_data_dict = json.loads(user_data)
        user_data_dict['liked_properties'].append(property_id)
        #user_data_JSON = json.dumps(user_data_dict)

        ElasticDatabase.updateDatabaseUser(userID=user_id, userData=user_data_dict)    

        return {'message': 'Property liked'}, 200
    except:
        return {'error': 'failed to like property'}, 404
    
@app.route('/unlike-property/<string:user_id>/<int:property_id>',methods = ['PUT'])
def unlike_property(user_id,property_id):
    try:
        user_data = ElasticDatabase.searchUser(user_id)
        user_data_dict = json.loads(user_data)
        user_data_dict['liked_properties'].remove(property_id)

        ElasticDatabase.updateDatabaseUser(userID=user_id, userData=user_data_dict)    

        return {'message': 'Property unliked'}, 200
    except:
        return {'error': 'failed to unlike property'}, 404

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


