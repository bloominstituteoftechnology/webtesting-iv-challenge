const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  console.log('success')
  res.status(200).json({ success: 'Endpoint yay' })
})

module.exports = server
