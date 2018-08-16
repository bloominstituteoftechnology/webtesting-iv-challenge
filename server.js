const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({api : "running"})
})

const dummyMusicos = [
    {
        name: "Paul",
        instrument: "Bass"
    },
    {
        name: "John",
        instrument: "Guitar"
    },
    {
        name: "Ringo",
        instrument: "Drums"
    },
    {
        name: "George",
        instrument: "Guitar"
    }
]

server.get('/musicians', (req,res) => {
    res.status(200).json(dummyMusicos)
})

module.exports = server