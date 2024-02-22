# This class is used for restructuring, tearing down, and setting up the database
# No functions in this class should be included in the functionality of our web app.
# If you are looking for database functions, check the ElasticDatabase.py file

import json
from ElasticDatabase import ElasticDatabase

class ElasticDatabaseOperations:
    def __init__(self):
        self.client = ElasticDatabase()

    def populateDatabaseWithPropertiesMockData(self):
        indexName = 'properties'

        if self.client.elasticsearch.indices.exists(index=indexName):
            self.client.elasticsearch.indices.delete(index=indexName)

        self.client.elasticsearch.indices.create(index=indexName)
        propertiesData = self.readJSON('mock_data\properties.json')
        #self.indexData(self.client, indexName, propertiesData)
        for doc_id, doc in enumerate(propertiesData):
            self.client.elasticsearch.index(index=indexName, id=doc_id, body=doc)


    @staticmethod
    def readJSON(fileName):
        with open(fileName) as file:
            data = json.load(file)
        return data
    
    @staticmethod
    def indexData(client, indexName, data):
        for doc_id, doc in enumerate(data):
            client.elasticsearch.index(index=indexName, id=doc_id, body=doc)


def main():
    elasticDatabaseOperations = ElasticDatabaseOperations()
    elasticDatabaseOperations.client.info()

    # Create/refresh properties index
    print('Creating properties index')
    elasticDatabaseOperations.populateDatabaseWithPropertiesMockData()

    print('All done :)')

if __name__ == "__main__":
    main()