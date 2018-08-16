const express = require('express')

const monks = [
  'Xifu',
  'Kal Ahl',
  'Tripitaka'
]

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ data: {monks} })
})

server.post('/', (req, res) => {
  const { name } = req.body
  monks.push(name);
  res.status(200).json({ hello: name })
})

server.delete('/', (req, res) => {

})



module.exports = server;
