# This class is used for restructuring, tearing down, and setting up the database
# No functions in this class should be included in the functionality of our web app.
# If you are looking for database functions, check the ElasticDatabase.py file

import os
import json
from ElasticDatabase import ElasticDatabase

class ElasticDatabaseOperations:
    def __init__(self):
        self.client = ElasticDatabase()
        self.propertyListingsMapping = ElasticDatabaseOperations.createPropertyListingsIndexMapping()
        self.propertyLikesMapping = ElasticDatabaseOperations.createPropertyLikesMapping()

    def populateDatabaseWithPropertyListingsData(self):
        indexName = 'property-listings'

        if self.client.elasticsearch.indices.exists(index=indexName):
            print(f'Deleting index \"{indexName}\"')
            self.client.elasticsearch.indices.delete(index=indexName)

        print(f'Creating index \"{indexName}\"')
        self.client.elasticsearch.indices.create(index=indexName, body=self.propertyListingsMapping)

        jsonName = os.path.join('mock_data', 'webscraping', 'daftData.json')
        print(f'Reading json \"{jsonName}\"')
        data = self.readJSON(jsonName)

        print('Indexing (please wait for confirmation)...')
        self.indexPropertyListingsData(data, indexName)

        print(f'\"{jsonName}\" indexing complete')

    def populateDatabaseWithPropertyLikesData(self):
        indexName = 'property-likes'

        if self.client.elasticsearch.indices.exists(index=indexName):
            print(f'\nDeleting index \"{indexName}\"')
            self.client.elasticsearch.indices.delete(index=indexName)

        print(f'Creating index \"{indexName}\"')
        self.client.elasticsearch.indices.create(index=indexName, body=self.propertyListingsMapping)

        propertyIdJson = os.path.join('mock_data', 'webscraping', 'property_ids.json')
        print(f'Reading json \"{propertyIdJson}\"')
        propertyIdData = self.readJSON(propertyIdJson)

        mockUserJson = os.path.join('mock_data', 'mock_users', 'mock_users.json')
        print(f'Reading json \"{mockUserJson}\"')
        mockUserData = self.readJSON(mockUserJson)

        # Need to index both files
        print('Indexing (please wait for confirmation)...')
        self.indexPropertyLikesData(propertyIdData['property_ids'], mockUserData, indexName)

        print(f'\"{mockUserJson}\" indexing complete')

    def indexPropertyListingsData(self, data, indexName):
        for jsonData in data[indexName]:
                doc = {
                    'identifier' : jsonData['id'],
                    'address': jsonData['address'],
                    'rent per month': jsonData['rent per month'],
                    'daft.ie link': jsonData['daft.ie link'],
                    'latitude': jsonData['latitude'],
                    'longitude': jsonData['longitude'],
                    'property-type':{
                        'category': jsonData['property-type']['category'],
                        'type-info': jsonData['property-type']['type'],
                        'bed': jsonData['property-type']['bed'],
                        'bath': jsonData['property-type']['bath'],
                        'm2': jsonData['property-type']['m2']
                    },
                    'pic': jsonData['pic']
                }
                self.client.elasticsearch.index(index=indexName, id=jsonData['id'], document=doc)

    def indexPropertyLikesData(self, propertyIdData, userData ,indexName):
        for propertyId in propertyIdData:
            liked_by = []
            for user in userData:
                liked_properties = user.get('liked_properties', [])
                if propertyId in liked_properties:
                    liked_by.append(user['firebase_id'])

            doc = {
                'property_id': propertyId,
                'liked_by': liked_by
            }

            # DEBUG
            #with open('debugLikes.json', 'a') as file:
                #json.dump(doc, file) 
                #file.write('\n') 

            self.client.elasticsearch.index(index=indexName, id=propertyId, body=doc)

    @staticmethod
    def readJSON(fileName):
        with open(fileName) as file:
            data = json.load(file)
        return data

    @staticmethod
    def createPropertyListingsIndexMapping():
        mapping = {
            "mappings": {
                "properties": {
                    "identifier":{
                        "type": "integer"
                    },
                    "address": {
                        "type": "keyword"
                    },
                    "rent per month":{
                        "type": "integer"
                    },
                    "daft.ie link":{
                        "type": "text"
                    },
                    "latitude":{
                        "type": "double"
                    },
                    "longitude":{
                        "type": "double"
                    },
                    "property-type":{
                        "type": "nested", "properties": {
                            "category":{
                                "type": "keyword"
                            },
                            "type-info": {
                                "type": "keyword",
                                "fields": {
                                    "text": { "type": "keyword" }
                                }
                            },
                            "bed":{
                                "type": "keyword"
                            },
                            "bath":{
                                "type": "keyword"
                            },
                            "m2":{
                                "type": "text"
                            }
                        }
                    },
                    "pic": {
                        "type": "text"  # Change the type to "text" to accommodate URLs
                    }
                }
            }
        }
        return mapping

    @staticmethod
    def createPropertyLikesMapping():
        propertyLikesMapping = {
            "mappings": {
                "properties": {
                    "property_id": {"type": "keyword"},
                    "liked_users": {"type": "keyword"}
                }
            }
        }
        return propertyLikesMapping


def main():
    elasticDatabaseOperations = ElasticDatabaseOperations()
    elasticDatabaseOperations.populateDatabaseWithPropertyListingsData()
    elasticDatabaseOperations.populateDatabaseWithPropertyLikesData()
    print('All done!')
    
if __name__ == "__main__":
    main()