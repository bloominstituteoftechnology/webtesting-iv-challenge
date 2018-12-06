const express = require('express')
const port = process.env.PORT || 3334
const server = express()

server.use(express.json())

server.get('/', (req, res) =>{
    res.status(200).json({this:'sucks'})
})

server.listen(port, ()=> console.log(`we hear you ${port}`))

module.exports =server