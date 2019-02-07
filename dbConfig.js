const knex = require('knex')
const config = require('./knexfile.js')

const dbCONFIG = process.env.DB_ENV || 'development'

module.exports = knex(config[dbCONFIG])