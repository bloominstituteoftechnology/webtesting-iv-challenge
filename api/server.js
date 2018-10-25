const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req,res)=>{
    res.status(200).json({message: 'server up'});
});

server.post('/hello/:name', (req,res)=>{
    const {name} = req.params;
    const lastName = req.body.lastName;
    res.status(201).json({hello: `${name} ${lastName}`});
})

module.exports = server;