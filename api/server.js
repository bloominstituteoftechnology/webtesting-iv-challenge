const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const db = require('../data/dbConfig')

const server = express()
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

server.get('/', (req, res) => {
  console.log('success')
  res.status(200).json({ message: 'success' })
})

server.get('/api/library', async (req, res) => {
  try {
    const library = await db('library')
    res.status(200).json(library)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error while fetching library.' })
  }
})

// server.post('/api/library', (req, res) => {
//   let { artist, album, description, songs } = req.body
//   if (!artist || !album || !description || !songs) {
//     res.status(400).json({ error: 'Please provide artist, album, description, and songs.' })
//   }
//   res.status(201).json({ artist, album, description, songs })
// })

server.post('/api/library', async (req, res) => {
  const { artist, album, description } = req.body
  if (!artist || !album || !description) {
    res.status(404).json({ message: 'Please provide all fields before submitting request.' })
  }
  try {
    const id = await db('library').insert(req.body)
    res.status(201).json(id)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error while posting to the database' })
  }
})

server.delete('/api/library/:id', (req, res) => {
  res.status(200).json({ message: 'The entry was successfully deleted' })
})

module.exports = server
