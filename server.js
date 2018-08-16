const express = require('express')

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ msg: 'username and password are required.' })
  }
  res.status(201).json({ msg: `user account (${username}) created.` })
})

module.exports = server
