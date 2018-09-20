const express = require('express')
const server = express()

server.use(express.json())

server.post('/', (req, res, next) => {
  res.status(201).json({ msg: 'okayy' })
})

server.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({ msg: `Movie of ${id} deleted.` })
})
module.exports = server
