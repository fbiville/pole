// npm install --save neo4j-driver
// node example.js
const neo4j = require('neo4j-driver');
const driver = neo4j.driver('neo4j+s://demo.neo4jlabs.com:7687',
                  neo4j.auth.basic('pole', 'pole'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const query =
  `
  MATCH (l:Location {address:$address})<-[r:OCCURRED_AT]-(c:Crime)
  RETURN c.date as crimeDate
  `;

const params = {"address": "Piccadilly"};

const session = driver.session({database:"pole"});

session.run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
        console.log(record.get('crimeDate'));
    });
    session.close();
    driver.close();
  })
  .catch((error) => {
    console.error(error);
  });