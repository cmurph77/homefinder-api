## Setting Up

- Pre-requisite
1. Download and install *Docker Desktop*: https://www.docker.com/products/docker-desktop/
2. Ensure docker desktop is running before continuing.


------------ Instructions For Setting Up the homefinder Applicaiton ----------------------------------------

In order to run this applicaiton in development Mode you must clone the code for the backend and frontend into 2 seperate dirctories

1. Clone the 'production-back-end' and follow the instructions below to set up the backend infrastructure
2. Open a terminal in the same folder as the 'docker-compose.yaml' file.
3. In the terminal type the following line: *docker compose build* and then *docker compose up*
4. Ensure that the containers 'es01-1' and 'api-1' are running, if not run *docker compose down* and re-do step 2
5. Wait for the following line to display: *setup-1 exited with code 0*.
6. The elasticsearch container is now set up.
  - You may need to keep this terminal window open to keep the container running.

7. To test the server connection open up a web browser and go to the following address: *http://localhost:9200/*.
8. If asked for credentials:
        
    username: elastic               
    password: changeme

9. Next you must populate the database.
9.1    Open docker desktop on your machine and navigate to the api-homefinder network
9.2    Open the terminal for the 'api-1' container , (this can be found by clicking on the 3 little dots beside the container)
9.3    Run the python script to populate the database, this can be done with the command *python ElasticDatabaseOperations.py*
9.4    the script will run and is finshed when you see the message 'All Done!'

10. You can check that the API is running by going to 'http://localhost:8000/'

Next you must set up the frontend

11. Into another directory clode the 'production-front-end'
12. Now in this directory, run 'npm install' to install all node dependencies
13. Finaly run 'npm start' to start up the front end in development mode
14. You wil be presented with the login screen - You can create your own account or use the test account details below
    
    email: test@test.com
    password: 123456

15. Enjoy our Application



### Testing `npm start`

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













