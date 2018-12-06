const express = require('express')

const server = express()

server.use(express.json())

let items = []

server.post('/items', (req, res) => {
  const { item } = req.body

  if (item) {
    items.push(item)
    res.status(201).send()
  } else {
    res.status(400).send()
  }
})

server.delete('/items', (req, res) => {
  const { item } = req.body

  if (item) {
    items = [...items.filter(x => x !== item)]
    res.status(200).send()
  } else {
    res.status(400).send()
  }
})

module.exports = server
