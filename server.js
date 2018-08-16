const express = require('express');
const server = express();

server.use(express.json());
server.get('/', (req, res) => {res.status(200).json({api: 'API is running'})})
server.post('/parishes', (req, res) => {
    const { name, capital } = req.body;
    res.status(201).json({ name, capital });
})
server.delete('/parishes/:parish', (req, res) => {
    const { parish } = req.params;
    res.status(200).json({ msg: `${parish} has been deleted.` });
})

module.exports = server;