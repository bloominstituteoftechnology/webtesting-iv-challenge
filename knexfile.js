// Update with your config settings.
localPgConnection = {
    host: 'localhost',
    database: 'bicycles',
    user: 'pat',
    password: 'pass'
  }
  const prodDbConnection = process.env.DATABASE_URL || localPgConnection
  
  module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/bicycles.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './data/test.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
  
    production:{
      client: 'pg',
      connection: prodDbConnection, //an object or string
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    }
  };
  