
const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({api: 'up'});
});

server.post('/books', (req, res) => {
    const { title } = req.body;
    res.status(200).json({ title: 'Of Mice and Men' });
})


module.exports = server;

