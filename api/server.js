const express = require('express')
const db = require('../data/db.js')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'runnin' })
})

server.post('/menu', (req, res) => {
  const { dish } = req.body
  db('menu').insert(dish)
  res.status(201).json({ message: 'dish prepared' })
})

server.delete('/menu/:id', (req, res) => {
    const { id } = req.params
    db('menu').where({ id }).del(id)
    res.status(200).json({ message: 'dish eaten'})
})

module.exports = server
