# This class is for general elastic search functions which can and should be used by backend and frontend developers

from elasticsearch import Elasticsearch
import json
import os

ELASTIC_USERNAME = "elastic"
ELASTIC_PASSWORD = "changeme"
ELASTIC_ENDPOINT = "http://es01:9200/" 
#ELASTIC_ENDPOINT = "http://localhost:9200/"

class ElasticDatabase:
    def __init__(self):
        self.endpoint = ELASTIC_ENDPOINT
        self.elasticsearch = Elasticsearch(ELASTIC_ENDPOINT, basic_auth=(ELASTIC_USERNAME, ELASTIC_PASSWORD))

    def info(self):
        client = ElasticDatabase()
        return client.elasticsearch.info()

    def search(numberOfResults, pageNumber):
        client = ElasticDatabase()
        startIndex = (pageNumber - 1) * numberOfResults
        query = {
            "size": numberOfResults,
            "from": startIndex,
            "query": {
                "match_all": {}
            }
        }
        searchResult = client.elasticsearch.search(index="property-listings", body=query)
        propertiesData = []
        all_hits = searchResult['hits']['hits']
        for num, doc in enumerate(all_hits):
            for key, value in doc.items():
                if(key == "_source"):
                    propertiesData.append(value)
        propertiesJSON = json.dumps(propertiesData, indent=4)
        return propertiesJSON



    def searchWithField(numberOfResults, pageNumber, field):
        client = ElasticDatabase()
        startIndex = (pageNumber - 1) * numberOfResults
        query = {
            "size": numberOfResults,
            "from": startIndex,
            "sort": field,
            "query": {
                "match_all": {}
            }
        }
        searchResult = client.elasticsearch.search(index="property-listings", body=query)
        propertiesData = []
        all_hits = searchResult['hits']['hits']
        for num, doc in enumerate(all_hits):
            for key, value in doc.items():
                if(key == "_source"):
                    propertiesData.append(value)
        propertiesJSON = json.dumps(propertiesData, indent=4)
        return propertiesJSON


    def searchByPropertyID(identifier):
        client = ElasticDatabase()
        query = {
            "query": {
                "match": {
                    "identifier": identifier
                }
            }
        }
        searchResult = client.elasticsearch.search(index="property-listings", body=query)
        propertyData = []
        if searchResult["hits"]["hits"]:
            propertyData = searchResult["hits"]["hits"][0]["_source"]
        propertiesJSON = json.dumps(propertyData, indent=4)
        return propertiesJSON
    
    # Returns list of liked properties
    def searchUserLikedProperties(identifier):
        client = ElasticDatabase()
        query = {
            "query": {
                "match": {
                    "firebase_id": identifier
                }
            }
        }
        searchResult = client.elasticsearch.search(index="users-db", body=query)
        userData = {}
    
        if searchResult["hits"]["hits"]:
            userData = searchResult["hits"]["hits"][0]["_source"]
        #userJSON = json.dumps(userData.get("liked_properties", []), indent=4)
        return userData.get("liked_properties", []) #userJSON
    
    def searchPropertyList(properties):
        client = ElasticDatabase()
        query = {
            "query": {
                "ids": {
                    "values": properties
                }
            }
        }
        searchResult = client.elasticsearch.search(index="property-listings", body=query)
        propertyData = []
        #if searchResult["hits"]["hits"]:
            #propertyData = searchResult["hits"]["hits"][0]["_source"]

        for hit in searchResult["hits"]["hits"]:
            propertyData.append(hit["_source"])

        propertyJSON = json.dumps(propertyData)
        print(propertyJSON)
        return propertyJSON

    def searchPropertyLikedUsers(identifier):
        client = ElasticDatabase()
        query = {
            "query": {
                "match": {
                    "identifier": identifier
                }
            }
        }
        searchResult = client.elasticsearch.search(index="property-likes", body=query)
        propertyLikesData = []
        if searchResult["hits"]["hits"]:
            propertyLikesData = searchResult["hits"]["hits"][0]["_source"]
        likedUsersJSON = json.dumps(propertyLikesData, indent=4)
        return likedUsersJSON 

# Test connection
def main():

    # - - Search for first 50 properties - -

    # numberOfResults = 10
    # pageNumber = 1
    # propertyData = ElasticDatabase.search(numberOfResults, pageNumber)
    # # Print propertyData
    # propertyList = json.loads(propertyData)
    # for prop in propertyList:
    #     print(f"{prop['identifier']}, {prop['address']}, {prop['rent per month']}")



    # - - Search using a field - -

    numberOfResults = 50
    pageNumber = 1
    sortBy = 'rent per month'
    propertyData = ElasticDatabase.searchWithField(numberOfResults, pageNumber, sortBy)
    # Print propertyData
    propertyList = json.loads(propertyData)
    for prop in propertyList:
        print(f"{prop['identifier']}, {prop['address']}, {prop['rent per month']}")



    # - - Search for a property by identifier - -

    # propertyData = ElasticDatabase.searchByPropertyID(218980691)
    # # Print propertyData
    # print(propertyData)


    # Store PropertyData in a json

    fileName = 'FieldSearch50ByRentExample.json'
    filePath = os.path.join('mock_data', 'ExampleJSONs', fileName)
    with open(filePath, "w") as jsonFile:
        jsonFile.write(propertyData)

if __name__ == "__main__":
    main()


# ---------------------------------------------------------------------------------------------------------
# Example:

# Create instance, name it whatever you want
# client = ElasticDatabase()

# Return the 50 properties for page 1
# properties = client.search(50, 1)

# Return the next 50 properties for page 2
# properties = client.search(50, 2)

# Return the 50 properties for page 4 sorted by rent (low to high)
# properties = client.searchWithField(50, 4, 'rent per month')

# ---------------------------------------------------------------------------------------------------------
