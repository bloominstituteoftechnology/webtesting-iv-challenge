const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            results: [
                { name: 'frodo baggins' }
            ]
        }
    });
});

server.post('/', (req, res) => {
    const { name } = req.body;

    res.status(200).json({
        success: true,
        data: {
            results: [
                { name }
            ]
        }
    });
});

server.post('/greet/:name', (req, res) => {
    const { lastName } = req.body;
    const { name } = req.params;

    res.status(200).json({ hello: `${name} ${lastName}` });
});

server.put('/people/:id', (req, res) => {

});

server.delete('/people/:id', (req, res) => {

});

module.exports = server;
