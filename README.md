
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

Run the batch file titled *elastic-setup.bat* and skip to *step 3*, to manually set up the database continue to *step 1*.
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


* If you have any trouble setting up the elastic database, ask Cian O'Gorman.
