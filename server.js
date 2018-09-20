const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res)=> {
    res.status(200).json({api: 'running'});
});

server.post('/greet/:name', (req,res) => {
    const first = req.params.name; //notice first name comes from params (part of url)
    const last = req.body.last; //notice that last name comes from body (part of request body)
    res.status(200).json({ hello: `${first} ${last}` });
});

module.exports = server;