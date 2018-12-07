const express = require('express')
const server = express()
const db = require('./knexConfig')

server.use(express.json())

server.post('/users', (req,res)=>{
    const {username} = req.body
    console.log(req.body)
    db('users').insert({username: req.body.username}).then(user=>{
        console.log(user);
        res.status(200).json(user)
    })
    
})

module.exports = server;