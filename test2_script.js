const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const command = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  function listFamousPeople(db) {
    db.query("SELECT first_name, last_name FROM famous_people WHERE first_name = $1::text or last_name = $1::text;", [command], (err, result) => {
      console.log('err', err);
      console.log('result', result)
      client.end();
        });
  };

  function famousPeople(db, firstName, lastName, birthday) {
    const query = `INSERT INTO
    "famous_people" (first_name, last_name, birthdate)
    VALUES ($1::Text, $2::Text, $3::date);`

    db.query(query, [firstName, lastName, birthday], (err, res) => {
      console.log('famousPeople err:', err);
      console.log('famousPeople res:', res);
    });
  }

  client.connect((err) => {
    console.log('command', command);
    if (command === 'C') {
      famousPeople(client, process.argv[3], process.argv[4], process.argv[5]);
    }
    listFamousPeople(client);
  });
});



