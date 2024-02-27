# This class is for general elastic search functions which can and should be used by backend and frontend developers

from elasticsearch import Elasticsearch
import json

ELASTIC_USERNAME = "elastic"
ELASTIC_PASSWORD = "changeme"
ELASTIC_ENDPOINT = "http://localhost:9200/"

class ElasticDatabase:
    def __init__(self):
        self.endpoint = ELASTIC_ENDPOINT
        self.elasticsearch = Elasticsearch(ELASTIC_ENDPOINT, basic_auth=(ELASTIC_USERNAME, ELASTIC_PASSWORD))

    def info(self):
        return self.elasticsearch.info()

    def search(self, numberOfResults, pageNumber):
        startIndex = (pageNumber - 1) * numberOfResults
        query = {
            "size": numberOfResults,
            "from": startIndex,
            "query": {
                "match_all": {}
            }
        }
        searchResult = self.elasticsearch.search(index="property-listings", body=query)
        properties = []
        all_hits = searchResult['hits']['hits']
        for num, doc in enumerate(all_hits):
            for key, value in doc.items():
                if(key == "_source"):
                    properties.append(value)
        properties_json = json.dumps(propertyData)
        return properties_json



    def searchWithField(self, numberOfResults, pageNumber, field):
        startIndex = (pageNumber - 1) * numberOfResults
        query = {
            "size": numberOfResults,
            "from": startIndex,
            "sort": field,
            "query": {
                "match_all": {}
            }
        }
        searchResult = self.elasticsearch.search(index="property-listings", body=query)
        properties = []
        all_hits = searchResult['hits']['hits']
        for num, doc in enumerate(all_hits):
            for key, value in doc.items():
                if(key == "_source"):
                    properties.append(value)
        properties_json = json.dumps(properties)
        return properties_json


    def searchByPropertyID(self, identifier):
        query = {
            "query": {
                "match": {
                    "identifier": identifier
                }
            }
        }
        searchResult = self.elasticsearch.search(index="property-listings", body=query)
        propertyData = []
        for hit in searchResult["hits"]["hits"]:
            propertyData.append(hit["_source"])
        properties_json = json.dumps(propertyData)
        return properties_json
        

# Test connection
def main():
    client = ElasticDatabase()

    # Search with field
    # numberOfResults = 50
    # pageNumber = 1
    # sortBy = 'address'
    # properties_json = client.searchWithField(numberOfResults, pageNumber, sortBy)
    # properties = json.loads(properties_json)
    # for prop in properties:
    #     print(f"{prop['identifier']}, {prop['address']}, {prop['rent per month']}")


    propertyData = client.searchByPropertyID(218980691)
    print(propertyData)

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
