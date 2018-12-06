const express = require('express')

const server = express()

server.use(express.json())

const items = []

server.post('/items', (req, res) => {
  const { item } = req.body

  if (item) {
    items.push(item)
    req.status(201)
  } else {
    req.status(400)
  }
})

server.post('/items', (req, res) => {
  const { item } = req.body

  if (item) {
    items.filer(x => x !== item)
    req.status(200)
  } else {
    req.status(400)
  }
})

const port = process.env.PORT || 9000

module.exports = server
