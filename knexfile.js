// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/drinks'
    }
  },

  useNullAsDefault: true,
  
  migrations: {
    directory: './migrations'
  },
  
  seeds: {
    directory: './seeds'
  },

  };
