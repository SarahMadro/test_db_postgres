const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

  const command = process.argv[2];

  knex.from('famous_people').select('*').where('first_name', command).orWhere('last_name', command)
    .then((result) => {
      console.log('result:', result);
    }).catch((err) => {
      console.log('error:', err);
      knex.destroy();
    });




