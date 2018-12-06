const db = require('./data/dbConfig.js')

module.exports = {
    insert
}

async function insert(user) {
  const [ id ] = await db('users').insert(user)

   return db('users').where({ id }).first()
}