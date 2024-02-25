# This class is for general elastic search functions which can and should be used by backend and frontend developers

from elasticsearch import Elasticsearch

ELASTIC_USERNAME = "elastic"
ELASTIC_PASSWORD = "changeme"
ELASTIC_ENDPOINT = "http://localhost:9200/"

class ElasticDatabase:
    def __init__(self):
        self.endpoint = ELASTIC_ENDPOINT
        self.elasticsearch = Elasticsearch(ELASTIC_ENDPOINT, basic_auth=(ELASTIC_USERNAME, ELASTIC_PASSWORD))

    def info(self):
        return self.elasticsearch.info()

    def search(self, index, query):
        try:
            result = self.es.search(index=index, body=query)
            hits = result['hits']['hits']
            return hits
        except Exception as e:
            print(f"An error occurred during search: {e}")
            return ['Error']
        

# Test connection
def main():
        
    client = ElasticDatabase()
    json = client.info()
    print(client.info())

if __name__ == "__main__":
    main()

def main():
    print('ready...')

    client = ElasticDatabase()
    print(client.info())

    print('All done :)')


if __name__ == "__main__":
    main()


# ---------------------------------------------------------------------------------------------------------
# Example:

# Create instance call it whatever you want

# elastic_db = ElasticDatabase()



# perform a search like this :)
# This depends on the structure of the json (better functions coming soon!!!)

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
