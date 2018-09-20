const express = require('express');
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({api: 'running'});
});

server.get('/hello', (req, res) => {
    res.status(200).json({hello: 'hello'});
});

server.post('/greet/:name', (req, res) => {
    const name = req.params.name;
    const last = req.body.last;

    res.status(200).json({whatsup: `${name} ${last}`});
});

server.delete("/:name", (req, res) => {
    const name = req.params.name;
    res.status(200).json(name);
});
     



module.exports = server;
