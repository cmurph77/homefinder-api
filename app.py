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

# ---------------- CONNNECTED TO DATABASE + OPERATIONAL -------------------------------------
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

# This returns a list of propertys that should be on the specified pagenum
@app.route('/get-propertys-by-pagenum-live/<int:pagenum>/<int:numresults>', methods=['GET'])
def get_propertys_pagesize(pagenum,numresults):
    current_time = datetime.now()
    print("GET REQ - /get-propertys-by-pagenum  pagenum: " +str(pagenum) + ", pagesize:" +str(numresults)+" @ [" + str(current_time) + "]")
    data = ElasticDatabase.search(numresults,pagenum)
    return data

# This returns a list of filtered properties
@app.route('/get-propertys-with-filter-live/', methods=['POST'])
def get_propertys_filtered():
    print('Filter requst recieved')
    try:
        request_data = request.get_json()
    except:
        return {'error:' : 'coudl not reade request body'}
    print(request_data)
    minRent = int(request_data.get('min_rent'))
    maxRent = int(request_data.get('max_rent'))
    minBath = int(request_data.get('min_bath'))
    maxBath = int(request_data.get('max_bath'))
    minBed = int(request_data.get('min_bed'))
    maxBed = int(request_data.get('max_bed'))
    pagenum = int(request_data.get('page_num'))
    numresults = int(request_data.get('num_results'))
    current_time = datetime.now()
    print("GET REQ - /get-propertys-with-filter  minRent: " +str(minRent) + ", maxRent:" +str(maxRent) + ", minBed:" +str(minBed) + ", maxBed:" +str(maxBed) + ", minBath:" +str(minBath) + ", maxBath:" +str(maxBath) + ", pagenum:" +str(pagenum) + ", numresults:" +str(numresults) +" @ [" + str(current_time) + "]")
    data = ElasticDatabase.searchPropertiesWithFilter(minRent,maxRent,minBed,maxBed,minBath,maxBath,pagenum,numresults)
    return data

# Tries to return liked property values if found
@app.route('/get-liked-properties/<string:user_id>', methods=['GET'])
def get_liked_properties(user_id):
    liked_propertyIDs = ElasticDatabase.searchUserLikedProperties(user_id) #Try yXbHXGB1 for debug
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

@app.route('/get-propertys-liked-users/<string:user_id>', methods=['GET'])
def get_propertys_liked_users(user_id):
    
    print('GET - properties likes users with user_id: ' + str(user_id))
    try : 
        liked_users_ids_json = ElasticDatabase.searchPropertyLikedUsers(user_id) #Try yXbHXGB1 for debug
    except:
        return { 'message' : 'could not read to database' },404
    # Parse the JSON string into a dictionary
    liked_users_ids = json.loads(liked_users_ids_json)
    user_info_list = []
    for user_id in liked_users_ids["liked_by"] :
        print("user_id: " + str(user_id))
        user_info = ElasticDatabase.searchUser(user_id)
        user_info_json = json.loads(user_info)
        # var_type = type(user_info_json)
        # print(var_type)
        # print(user_info_json)
        user_info_list.append(user_info_json)


    # processed_data = [user_info.replace("\\", "") for s in user_info_list]
    # print(processed_data)
    return json.dumps(user_info_list)


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

        # TESTING
        try:
            ElasticDatabase.updateDatabasePropertyLikes(propertyID=property_id, likes=property_liked_users_list)
        except:
            return {'error': 'Cannot update database properties'}, 404 



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

        # TESTING
        property_liked_users = ElasticDatabase.searchPropertyLikedUsers(property_id)
        property_liked_users_dict = json.loads(property_liked_users)
        property_liked_users_list = property_liked_users_dict['liked_by']

        if user_id in property_liked_users_list:
            property_liked_users_list.remove(user_id)
        try:
            ElasticDatabase.updateDatabasePropertyLikes(propertyID=property_id, likes=property_liked_users_list)
        except:
            return {'error': 'Cannot update database properties'}, 404 

        return {'message': 'Property unliked'}, 200
    except:
        return {'error': 'failed to unlike property'}, 404

# this endpoint updates user info
@app.route('/update-users-info/', methods=['POST'])
def update_user_info():
    print('RECIEVED REQUEST TO UPDATE USER DATA')
    try:
        request_data = request.get_json()
    except: 
        return { 'error' : 'could not read request data'}
    
    try:
        user_id = request_data.get('firebase_id')
        print('user_id: ' + user_id)
    except: 
        return { 'error' : 'could not read user_id from data'}
    # DEBUG 
    #user_id = "YSixicUz"
    #root_dir = os.path.dirname(os.path.abspath(__file__))
    #file_path = os.path.join(root_dir, 'sample.JSON')
    #with open(file_path, 'r')as file:
    #    user_data = json.load(file)

    # logic to update the user data in database
    try:
        ElasticDatabase.updateDatabaseUser(userID=user_id, userData=request_data)
        return { 'message': 'successfully updated'}, 200
    except: 
        return {'error' : 'error adding to database'}, 404

# Takes json data from frontend accompanied with request in same format as database index send json in body
@app.route('/add-user-to-database/', methods=['POST'])
def create_user():
    print('-- RECEIEVED REQUEST TO ADD NEW USER\n')
    try :
        user_data = request.get_json()
    except: 
        return {'error': 'Could not read request user data'}, 404
    
    print(json.dumps(user_data,indent=4))

    try:
        ElasticDatabase.addNewUserToDatabase(user_data)
        return "Success", 200
    except:
        return {'error': 'Could not add user to database'}, 404
    
        # this endpoint takes a user_id and property id and returns a string boolean if a user has liked the propeerty
@app.route('/check-user-liked-property/<string:user_id>/<int:property_id>', methods=['GET'])
def check_liked_property(user_id, property_id):
    try:
        user_info = ElasticDatabase.searchUser(user_id)
        # set user info to the users_info retireved from database
        if user_info != '{}':
            user_info_dict = json.loads(user_info)
            property_ids = user_info_dict.get("liked_properties")
            for id in property_ids:
                id = int(id)
                #print(id)
                if id == property_id:
                    return "Liked", 200
            return "Unliked", 200
        else:
            return "User not found", 404
    except: 
        return {'error': 'Invalid User ID'}, 404
    


# Takes a list of liked properties and updates user likes along with removing users on liked properties
@app.route('/user/update-liked-properties/', methods=['POST'])
def update_liked_properties():
    print('-- RECEIEVED REQUEST TO UPDATE LIKED PROPERTIES\n')
    try :
        update_info = request.get_json()
        user_id = update_info.get('user_id', None)
        list_data = update_info.get('property_ids', None)
        # user_id = "yXbHXGB1"      #DEBUG 
        # list_data = []      #DEBUG 
        user_data = ElasticDatabase.searchUser(user_id)  # Debug ID
        user_data_dict = json.loads(user_data)
        # Record old liked property values
        liked_properties_list = user_data_dict['liked_properties']
        # Update user data with new liked property values
        user_data_dict['liked_properties'] = list_data
        
    except: 
        return {'error': 'Could not read request or pull user data'}, 404
    
    passed_list = set(list_data)
    database_list = set(liked_properties_list)

    difference_list = database_list - passed_list
    difference_list = list(difference_list)
    print(difference_list)

    try:
        ElasticDatabase.updateDatabaseUser(user_id, user_data_dict)
    except:
        return {'error': 'Could not update user in database'}, 404
    
    # remove user ids from properties
    try:
        removed_properties = difference_list
        for property_id in removed_properties:
            property_liked_users = ElasticDatabase.searchPropertyLikedUsers(property_id)
            property_liked_users_dict = json.loads(property_liked_users)
            property_liked_users_list = property_liked_users_dict['liked_by']

            if user_id in property_liked_users_list:
                property_liked_users_list.remove(user_id)
            try:
                ElasticDatabase.updateDatabasePropertyLikes(propertyID=property_id, likes=property_liked_users_list)
            except:
                return {'error': 'Cannot update database properties'}, 404
        return 'Success', 200
                
    except Exception as e:
        print(e)
        return {'error': 'Could not update property likes database'}, 404
    # =================================================================================================
