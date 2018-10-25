const express = require('express');

const server = express();

server.use(express.json());

server.get('/get', (req, res) => {
  res.status(200).json(data);
});

server.post('/create', (req, res) => {
    const {name, age} = req.body;
    const newUser = {name, age};

    data = [...data, newUser];
    
    res.status(201).json({name})
});

server.post('/make', (req, res) => {
    const { name } = req.body;
    if(!name) { res.status(422).json({error: 'no name included in request'})}
    else { res.status(201).json({name}) };
})

server.delete('/delete', (req, res) => {
    const name = req.body.name; 


    res.status(200).json(true);
})

let data = [
    { name: 'clint', age: 27 },
    { name: 'lauren', age: 25 },
];

module.exports = server; 