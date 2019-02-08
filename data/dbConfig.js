const knex = require('knex');
const config = require('../knexfile');

const dbEnv = 'development';

module.exports = knex(config[dbEnv]);