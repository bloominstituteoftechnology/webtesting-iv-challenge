const express = require('express')

const server = express()

const testData = require('./testData')

server.get('/', (req, res) => {
  res.status(200).json({message: 'up!'})
})

server.use('/api', require('./apiRoutes'))

module.exports = server