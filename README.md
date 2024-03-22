

# Instructions to run this code
1. First you must clone the backend code for this project at - it is the api-main of the homefinder repository
    link:  https://github.com/cmurph77/homefinder/tree/api-main
2. Follow the instructions in the README.md file of api-main to launch the containers for database and backend code
3. You can verify if the  backend is set up by going to 'http://localhost:8000/' . There should be a welome message from the homefinder server
4. Now in this directory, run 'npm install' to install all node dependencies
5. Finaly run 'npm start' to start up the front end in development mode
6. You wil be presented with the login screen - You can create your own account or use the test account details belw
    email: test@test.com
    password: 123456


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



# APIs

## listing page

### User Like property

```python
@app.route('/listing/like_property', methods=['GET']))
def like_property():
    try:
        user_id = request.args.get('user_id', None)
        property_id = request.args.get('property_id', None)
        # xxxxxxxxxxxx
        # update database
        # return a list of users who also like this property
        return jsonify({"sucess": True, "user_list": user_list}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```

### User DisLike property

```python
@app.route('/listing/dislike_property', methods=['GET']))
def like_property():
    try:
        user_id = request.args.get('user_id', None)
        property_id = request.args.get('property_id', None)
        # xxxxxxxxxxxx
        # update database
        return jsonify({"sucess": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```



## user page

### GET liked properties

```python
@app.route('/user/get_liked_properties', methods=['GET']))
def get_liked_properties():
    try:
        user_id = request.args.get('user_id', None)
        # xxxxxxxxxxxx
        # return a list of liked properties
        # { 
        #    "property_id": xxx,
        #    "rent": "1,000"/1000,
        #    "address": xxxxxx
        # }
        return jsonify({"sucess": True, "liked_properties": liked_properties}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```

### UPDATE liked properties

```python
@app.route('/user/update_liked_properties', methods=['POST']))
def update_liked_properties():
    try:
        update_info = request.get_json()
        user_id = update_info.get('user_id', None)
        new_liked_property_ids = update_info.get('property_ids', None) # list
        # update the database
        return jsonify({"sucess": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": e"}), 400
```













