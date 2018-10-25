const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'server is working'});
});


function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

server.get('/api/people', (req, res) => {
    const people = {
        person: "Snoop Dogg",
        person: "Elon Musk"
    };
    res.status(200).json(people);
})

server.post('/api/people/:person', (req, res) => {
    const {person} = req.params;
    res.status(201).json(person);
})

server.delete('api/people/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
})

module.exports = server;