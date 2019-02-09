const knex = require('knex');
const config = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development';   //or default to development

module.exports = knex(config[dbEnv]);

