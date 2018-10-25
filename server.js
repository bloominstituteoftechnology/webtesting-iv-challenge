const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send('its working');
})

server.get('/vehicle/add', (req,res)=> {
    res.status(200).send('truthy ;)');
})

server.post('/vehicle/add', (req, res)=> {
    const {make, model} = req.body;

    res.status(201).send(`You have added the ${make} ${model} to the database`)
})

server.get('/vehicle/delete', (req,res)=> {
    res.status(200).send('Im alive')
})

server.delete('/vehicle/delete', (req, res)=> {
    const {make, model} = req.body;

    res.status(200).send(`You deleted a ${make} ${model}, congrats we all know they should only be 2dr`)
})

module.exports = server;