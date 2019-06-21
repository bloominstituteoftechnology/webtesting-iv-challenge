const express = require('express')

const db = require('../data/dbConfig')
const Characters = require('../lol/characterModel')
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: "up and running" })
})

server.get('/characters', (req, res) => {
    Characters.getAll()
    .then(characters => {
        res.status(200).json(characters)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post('/characters', async (req, res) => {
    const character = req.body
    try {
        const [id] = await db('characters')
        .add(character)

        const newChar = await db('characters')
        .where({ id })
        .first()
        res.status(200).json(newChar)
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "error while creating a character"})
    }
})

server.delete("/characters/:id", async (req, res) => {
    Characters.getAll()
  });

module.exports = server;