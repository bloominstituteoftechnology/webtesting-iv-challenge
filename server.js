const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({api : "running"})
})

let dummyMusicos = [
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

server.get('/beatles', (req,res) => {
    res.status(200).json(dummyMusicos)
})

server.post('/beatles', (req, res) => {
    const { name, instrument} = req.body

    const musician = {
        name: name,
        instrument: instrument
    }

    dummyMusicos.push(musician)

    res.status(200).json(dummyMusicos)
})

module.exports = server