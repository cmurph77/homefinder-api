# homefinder
This is the backend code for the homefinder application as part of the group design project.

# elasticsearch database set up.

- Pre-requisite
1. Download and install *Docker Desktop*: https://www.docker.com/products/docker-desktop/
2. Ensure docker desktop is running before continuing.

Run the batch file titled *elastic-setup.bat* and skip to *step 4*, to manually set up the database continue to *step 1*.
1. Open a terminal in the same folder as the 'docker-compose.yaml' file.
2. In the terminal type the following line: *docker compose up*
3. Wait for the following line to display: *setup-1 exited with code 0*.
4. The elasticsearch container is now set up.

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

* If you have any trouble setting up the elastic database, ask Cian O'Gorman.
