const knexConfig = require("../knexfile");

const dbEnv = process.env.DB_ENV || "development";
console.log("CURRENT DB ENV", dbEnv);

module.exports = require("knex")(knexConfig[dbEnv]);
