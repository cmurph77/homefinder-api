# This class is for general elastic search functions which can and should be used by backend and frontend developers

from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q
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
    
    def addNewUserToDatabase(userData):
        client = ElasticDatabase()
        indexName = 'users-db'
        # JSON DATA
        print('Indexing (please wait for confirmation)...')
        client.indexUsersData(userData, indexName)
        print(f'user indexing complete')

    def indexUsersData(self, data, indexName):
        client = ElasticDatabase()
        doc = {
            'firebase_id' : data['firebase_id'],
            'name' : data['name'],
            'profile_pic' : data['profile_pic'],
            'selected_tags':{
                'languages' : data['selected_tags']['languages'],
                'smoker' : data['selected_tags']['smoker'],
                'pets' : data['selected_tags']['pets'],
                'diet' : data['selected_tags']['diet'],
                'allergies' : data['selected_tags']['allergies'],
                'habit' : data['selected_tags']['habit'],
                'work' : data['selected_tags']['work']
            },
            'phone_number' : data['phone_number'],
            'bio' : data['bio'],
            'liked_properties' : data['liked_properties'],
            'liked_users' : data['liked_users'],
        }
        client.elasticsearch.index(index=indexName, id=data['firebase_id'], document=doc)


# NEEDS TO BE TESTED
    def updateDatabaseUser(userID, userData):
        client = ElasticDatabase()
        indexName = 'users-db'
        update = {
            'doc': {
            'name' : userData['name'],
            'profile_pic' : userData['profile_pic'],
            'selected_tags':{
                'languages' : userData['selected_tags']['languages'],
                'smoker' : userData['selected_tags']['smoker'],
                'pets' : userData['selected_tags']['pets'],
                'diet' : userData['selected_tags']['diet'],
                'allergies' : userData['selected_tags']['allergies'],
                'habit' : userData['selected_tags']['habit'],
                'work' : userData['selected_tags']['work']
            },
            'phone_number' : userData['phone_number'],
            'bio' : userData['bio'],
            'liked_properties' : userData['liked_properties'],
            'liked_users' : userData['liked_users'],
            }
        }

        response = client.elasticsearch.update(index=indexName, id=userID, body=update)
        print(response)
        print(f'user update complete')
    

    def searchUser(identifier):
        client = ElasticDatabase()
        try:
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

            userDataJSON = json.dumps(userData, indent=4)
            return userDataJSON
        except:
            return '{}'

    # 
    def searchPropertyLikedUsers(identifier):
        client = ElasticDatabase()
        query = {
            "query": {
                "match": {
                    "property_id": identifier
                }
            }
        }
        searchResult = client.elasticsearch.search(index="property-likes", body=query)
        propertyLikesData = []
        if searchResult["hits"]["hits"]:
            propertyLikesData = searchResult["hits"]["hits"][0]["_source"]

        liked_by = propertyLikesData.get("liked_by", [])

        likedUsersJSON = json.dumps({"liked_by": liked_by}, indent=4)
        return likedUsersJSON 
      
    # Search for a property with specified rent, bed and bath ranges
    def searchPropertiesWithFilter(minRent, maxRent, minBed, maxBed, minBath, maxBath, numberOfResults=50, pageNumber=1):
        client = ElasticDatabase()
        index = 'property-listings'
        search = Search(using = client.elasticsearch, index = index)

        # Making search keywords
        bedTerms = [f"{i} Bed" for i in range(minBed, maxBed + 1)]
        bathTerms = [f"{i} Bath" for i in range(minBath, maxBath + 1)]

        # making queries note:
        # gte = greater than or equal to
        # lte = less than or equal to
        rentQuery = Q("range", **{"rent per month": {"gte": minRent, "lte": maxRent}})
        bedQuery = Q("nested", path="property-type", query=Q("terms", **{"property-type.bed": bedTerms}))
        bathQuery = Q("nested", path="property-type", query=Q("terms", **{"property-type.bath": bathTerms}))
        query = rentQuery & bedQuery & bathQuery

        # Setting pagination
        from_ = numberOfResults * (pageNumber - 1)
        size = numberOfResults
        search = search.query(query)[from_:from_ + size]

        # Search
        searchResult = search.execute()

        # Format data
        propertiesData = []
        all_hits = searchResult['hits']['hits']
        for doc in all_hits:
            propertiesData.append(doc['_source'].to_dict())
        propertiesJSON = json.dumps(propertiesData, indent=4)
        return propertiesJSON


    def updateDatabasePropertyLikes(propertyID, likes):
        client = ElasticDatabase()
        indexName = 'property-likes'
        update = {
            'doc': {
            'liked_by' : likes
            }
        }
        response = client.elasticsearch.update(index=indexName, id=propertyID, body=update)
        print(response)
        print(f'property update complete')




# Test connection
def main():

    pass

    # user_ids = ElasticDatabase.searchPropertyLikedUsers(216696046)
    # print(user_ids)
    # - - Search properties with filter - -

    # minRent = 1100
    # maxRent = 1750
    # minBed = 2
    # maxBed = 3
    # minBath = 1
    # maxBath = 2
    # propertyData = ElasticDatabase.searchPropertiesWithFilter(minRent, maxRent, minBed, maxBed, minBath, maxBath)
    # propertyList = json.loads(propertyData)
    # print(len(propertyList))
    # for prop in propertyList:
    #     identifier = prop.get('identifier', 'N/A')
    #     rent = prop.get('rent per month', 'N/A')
    #     bed = prop['property-type'].get('bed', 'N/A')
    #     bath = prop['property-type'].get('bath', 'N/A')
    #     print(f"{identifier}, Rent: {rent}, Bed: {bed}, Bath: {bath}")

    # - - Search for first 50 properties - -

    # numberOfResults = 10
    # pageNumber = 1
    # propertyData = ElasticDatabase.search(numberOfResults, pageNumber)
    # # Print propertyData
    # propertyList = json.loads(propertyData)
    # for prop in propertyList:
    #     print(f"{prop['identifier']}, {prop['address']}, {prop['rent per month']}")



    # - - Search properties by field - -

    # numberOfResults = 50
    # pageNumber = 1
    # sortBy = 'rent per month'
    # propertyData = ElasticDatabase.searchWithField(numberOfResults, pageNumber, sortBy)
    # # Print propertyData
    # propertyList = json.loads(propertyData)
    # for prop in propertyList:
    #     print(f"{prop['identifier']}, {prop['address']}, {prop['rent per month']}")



    # - - Search for a property by identifier - -

    # propertyData = ElasticDatabase.searchByPropertyID(218980691)
    # # Print propertyData
    # print(propertyData)


    # - - Search for a user - -
    userData = ElasticDatabase.searchUser("YSixicUz")
    print(userData)


    # Store PropertyData in a json

    fileName = 'searchUserExample.json'
    filePath = os.path.join('mock_data', 'ExampleJSONs', fileName)
    with open(filePath, "w") as jsonFile:
        jsonFile.write(userData)

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
