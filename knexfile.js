// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/userDb.sqlite3"
    },
    migrations: {
      directory: "./data/migrations"
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./data/testUserDb.sqlite3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
