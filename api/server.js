const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  console.log('success')
  res.status(200).json({ message: 'success' })
})

server.post('/api/library', (req, res) => {
  let { artist, album, description, songs } = req.body
  if (!artist || !album || !description || !songs) {
    res.status(400).json({ error: 'Please provide artist, album, description, and songs.' })
  }
  res.status(201).json({ artist, album, description, songs })
})

server.delete('/api/library/:id', (req, res) => {
  res.status(200).json({ message: 'The entry was successfully deleted' })
})

module.exports = server
