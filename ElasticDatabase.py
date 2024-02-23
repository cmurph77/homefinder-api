<<<<<<< Updated upstream
=======
# This class is for general elastic search functions which can and should be used by backend and frontend developers.

>>>>>>> Stashed changes
from elasticsearch import Elasticsearch

ELASTIC_USERNAME = "elastic"
ELASTIC_PASSWORD = "changeme"
ELASTIC_ENDPOINT = "http://localhost:9200/"

client = Elasticsearch( ELASTIC_ENDPOINT, basic_auth=("elastic", ELASTIC_PASSWORD))

print(client.info())

class ElasticDatabase:
    def __init__(self, host='localhost', port=9200):
        self.host = host
        self.port = port
        self.elasticsearch = Elasticsearch([f"{self.host}:{self.port}"])

    def search(self, index, query):
        try:
            result = self.es.search(index=index, body=query)
            hits = result['hits']['hits']
            return hits
        except Exception as e:
            print(f"An error occurred during search: {e}")
            return ['Error']


# ---------------------------------------------------------------------------------------------------------
# Example:

# Create instance call it whatever you want
# elastic_db = ElasticDatabase(host='localhost', port=9200)

# perform a search like this :)
# index = 'your_index_name'
# query = {
#     "query": {
#         "match": {
#             "title": "example"
#         }
#     }
# }
# result = elastic_db.search(index, query)

# ---------------------------------------------------------------------------------------------------------
