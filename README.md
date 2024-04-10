## Setting Up

- Pre-requisite
1. Download and install *Docker Desktop*: https://www.docker.com/products/docker-desktop/
2. Ensure docker desktop is running before continuing.


------------ Step-by-Step Instructions For Setting Up the homefinder Application ----------------------------------------

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
        
            username: elastic               password: changeme

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




In order to run this application in development mode you must clone the code for the backend and frontend into 2 seperate directories

1. Clone the 'production-back-end' and follow the instructions below to set up the backend infrastructure
2. Open a terminal in the same folder as the 'docker-compose.yaml' file.
3. In the terminal type the following line: *docker compose build* and then *docker compose up*
4. Ensure that the containers 'es01-1' and 'api-1' are running, if not run *docker compose down* and re-do step 2
5. Wait for the following line to display: *setup-1 exited with code 0*.
6. The elasticsearch container is now set up.
  - You may need to keep this terminal window open to keep the container running.

7. To test the server connection open up a web browser and go to the following address: *http://localhost:9200/*.
8. If asked for credentials:
        
            username: elastic               password: changeme

9. Next you must populate the database.
9.1    Open docker desktop on your machine and navigate to the api-homefinder network
9.2    Open the terminal for the 'api-1' container , (this can be found by clicking on the 3 little dots beside the container)
9.3    Run the python script to populate the database, this can be done with the command *python ElasticDatabaseOperations.py*
9.4    the script will run and is finshed when you see the message 'All Done!'

10. You can check that the API is running by going to 'http://localhost:8000/'

Next you must set up the frontend

11. Into another directory clone the 'production-front-end' repository
12. Now in this directory, run 'npm install' to install all node dependencies
13. Finaly run 'npm start' to start up the front end in development mode
14. You wil be presented with the login screen where you can create your own account.
15. Enjoy our Application


# Testing 

First you must install dependencies with -> 'pip install -r requirements.txt'

To manually run the server run the command -> 'gunicorn app:app'

The server should run in the docker container labelled api which will be created when running docker-compose for elasticsearch

When making changes to the api container run -> 'docker-compose build' to apply these changes to the api

# LIVE Enpoints
/get-property-by-id-live/<int:property_id>' : This returns a property object of the given 'id'
/get-propertys-by-pagenum-live/<int:pagenum>/<int:numresults> : This returns a list of propertys that should be ont he specified pagenum

# Sample Endpoints

1. /dummydata-properties = this returns the daftData.json file which is filled with property data recieved from the daft webscraping script
2. //get-property-by-id-sample/<int:property_id> => This returns an property object - it is not connected to the database but will be noon (note sample keyword at the end)
3. /get-propertys-by-pagenum-sample/<int:pagenum>/<int:numresults> => returns a list of propertys - it is not connected to the database but will be noon (note sample keyword at the end)


## elasticsearch database set up.

- Pre-requisite
1. Download and install *Docker Desktop*: https://www.docker.com/products/docker-desktop/
2. Ensure docker desktop is running before continuing.

1. Open a terminal in the same folder as the 'docker-compose.yaml' file.
2. In the terminal type the following line: *docker compose up*
3. Wait for the following line to display: *setup-1 exited with code 0*.
4. The elasticsearch container is now set up.
  - You may need to keep this terminal window open to keep the container running.

5. To test the server connection open up a web browser and go to the following address: *http://localhost:9200/*.
6. If asked for credentials:
        
            username: elastic               password: changeme

7. If the password and username does not work look inside the env file as the log in details may have been changed.
8. If the following message displays after logging in, the database has been correctly set up:

            {
             "name" : "es01",
                 "cluster_name" : "docker-cluster",
                 "cluster_uuid" : "OhfRtnL6QoSWxjuZV1qBYQ",
             "version" : {
              "number" : "8.7.1",
             "build_flavor" : "default",
             "build_type" : "docker",
             "build_hash" : "f229ed3f893a515d590d0f39b05f68913e2d9b53",
             "build_date" : "2023-04-27T04:33:42.127815583Z",
             "build_snapshot" : false,
             "lucene_version" : "9.5.0",
             "minimum_wire_compatibility_version" : "7.17.0",
             "minimum_index_compatibility_version" : "7.0.0"
             },
             "tagline" : "You Know, for Search"
            }

9. The following plugin is available for most web browsers which will allow you to view and edit the database using a user interface: https://elasticvue.com/
    - If asked for a cluster name use *default cluster*, username and password are the same as above.

10. If you restart your PC you may need to teardown and rebuild the server, to do this run the batch file titled *elastic-teardown.bat*.
   - Alternatively open a terminal in the same folder as the *docker-compose.yaml* file and enter the following command:
      *docker compose down*
     
11. Run the ElasticDatabaseOperations.py file within vscode to populate the database.

12. Run the ElasticDatabase.py file within vscode, check the terminal and you should see search results
