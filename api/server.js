const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/create-user',(req,res) => {
    const {name} = req.body;
    res.status(201).json({UserCreated : name})
})



module.exports = server;
