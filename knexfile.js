// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    useNullAsDefault: true
  },
  migrations: {
    filename: "./data/migrations"
  },
  seeds: {
    filename: "./data/seeds"
  }
};
