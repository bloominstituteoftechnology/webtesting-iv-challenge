const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({message: 'server up'});
});

server.post('/create', (req, res) => {
    const name = req.body.name;
    
    res.status(201).json({user: name})
});

server.delete('/delete', (req, res) => {
    const name = req.body.name; 

    res.status(200).json(true);
})

module.exports = server; 