# pip3 install neo4j-driver
# python3 example.py

from neo4j import GraphDatabase, basic_auth

driver = GraphDatabase.driver(
  "neo4j+s://demo.neo4jlabs.com:7687", 
  auth=basic_auth("pole", "pole"))

cypher_query = '''
MATCH (l:Location {address:$address})<-[r:OCCURRED_AT]-(c:Crime)
RETURN c.date as crimeDate
'''

with driver.session(database="pole") as session:
  results = session.read_transaction(
    lambda tx: tx.run(cypher_query,
      address="Piccadilly").data())

  for record in results:
    print(record['crimeDate'])

driver.close()