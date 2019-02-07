// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/dev/migrations",
    },
    seeds: {
      directory: "./data/dev/seeds"
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/test/migrations",
    },
    seeds: {
      directory: "./data/test/seeds"
    },
  },
};
