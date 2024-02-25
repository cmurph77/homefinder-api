# This class is used for restructuring, tearing down, and setting up the database
# No functions in this class should be included in the functionality of our web app.
# If you are looking for database functions, check the ElasticDatabase.py file

import os
import json
from ElasticDatabase import ElasticDatabase

class ElasticDatabaseOperations:
    def __init__(self):
        self.client = ElasticDatabase()
        self.mapping = ElasticDatabaseOperations.createIndexMapping()

    def populateDatabaseWithPropertiesData(self):
        indexName = 'property-listings'

        if self.client.elasticsearch.indices.exists(index=indexName):
            print(f'Deleting index \"{indexName}\"')
            self.client.elasticsearch.indices.delete(index=indexName)

        print(f'Creating index \"{indexName}\"')
        self.client.elasticsearch.indices.create(index=indexName, body=self.mapping)

        jsonName = os.path.join('mock_data', 'daftData.json')
        print(f'Reading json \"{jsonName}\"')
        data = self.readJSON(jsonName)

        print('Indexing (please wait for confirmation)...')
        self.indexData(data, indexName)

        print(f'\"{jsonName}\" indexing complete')

    def indexData(self, data, indexName):
        for jsonData in data[indexName]:
                doc = {
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
                    }
                }
                self.client.elasticsearch.index(index=indexName, id=jsonData['id'], document=doc)

    @staticmethod
    def readJSON(fileName):
        with open(fileName) as file:
            data = json.load(file)
        return data

    @staticmethod
    def createIndexMapping():
        mapping = {
            "mappings": {
                "properties": {
                    "address": {
                        "type": "text"
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
                    "property-type": {
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
                    }
                }
            }
        }
        return mapping


def main():
    indexName = 'property-listings'
    elasticDatabaseOperations = ElasticDatabaseOperations()
    elasticDatabaseOperations.populateDatabaseWithPropertiesData()
    print('All done!')
    
if __name__ == "__main__":
    main()