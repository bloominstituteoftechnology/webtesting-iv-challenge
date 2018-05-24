const express = require('express')
const User = require('../models/User')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).send({ api: 'Running' })
})

server.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.status(200).send({ users }))
    .catch(err => res.status(500).send(err))
})

server.post('/api/users', (req, res) => {
  User.create(req.body)
    .then(user => res.status(201).send({ user }))
    .catch(err => res.status(500).send(err))
})

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).send({ user }))
    .catch(err => res.status(500).send(err))
})

server.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => User.findById(req.params.id)
      .then(user => res.status(200).send({ user })))
    .catch(err => res.status(500).send(err))
})

module.exports = server