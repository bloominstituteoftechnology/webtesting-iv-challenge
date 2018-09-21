const express = require('express');
const server = express();

server.use(express.json());

let dummyDB = [1];

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/hello', (req, res) => {
    res.status(200).json({ hello: 'FSW12'});
});

server.post('/greet/:name', (req, res) => {
    const name = req.params.name;
    const last = req.body.last;
    res.status(200).json({ hello:  `${ name } ${ last }` });
});

server.delete('/:id', (req, res) => {
    const splicedArr = dummyDB.splice(0, 1);
    res.status(201).json(splicedArr.length);
    dummyDB = [1];
});;

module.exports = server;
