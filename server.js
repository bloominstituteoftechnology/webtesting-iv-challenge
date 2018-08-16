const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({api : "running"})
})

let theBeatles = [
    {
        id: 1,
        name: "Paul",
        instrument: "Bass"
    },
    {
        id: 2,
        name: "John",
        instrument: "Guitar"
    },
    {
        id: 3,
        name: "Ringo",
        instrument: "Drums"
    },
    {
        id: 4,
        name: "George",
        instrument: "Guitar"
    }
]

server.get('/beatles', (req,res) => {
    res.status(200).json(theBeatles)
})

server.post('/beatles', (req, res) => {
    try{
        const { id, name, instrument, error } = req.body
        if(error){
            throw Error()
        }
        if(!id || !name || !instrument){
            res.status(422).json({error: "Missing id, name, or instrument"})
        }
        const musician = {
            id: id,
            name: name,
            instrument: instrument
        }
        theBeatles.push(musician)
        res.status(200).json(theBeatles)
    }catch(err){
        res.status(500).json({error: "The beatles really don't need another member"})
    }
   
})

server.delete('/beatles', (req,res) => {
    try{
        const { id, name, instrument} = req.body
        if(!id && !name && !instrument){
            res.status(422).json({error: "Missing id, name, or instrument"})
        }

        theBeatles = theBeatles.filter(beatle => {
            if(beatle.name !== name && beatle.id !== id && beatle.instrument !== instrument){
                return beatle
            }
        })

        res.status(200).json(theBeatles)
    }catch(err){
        res.status(500).json({id: id, name: name, instrument: instrument, error: "Hey, you can't get rid of a BEATLE!! (you're a monster)"})
    }
})

module.exports = server