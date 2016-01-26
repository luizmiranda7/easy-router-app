var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'easy_router',
    password : 'easy_router',
    database : 'easy_router',
    charset  : 'utf8'
  }
});

module.exports = require('bookshelf')(knex);