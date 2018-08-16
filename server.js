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

server.put('/people/:id', (req, res) => {
    const { id } = req.params;
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

server.delete('/people/:id', (req, res) => {
    const { id } = req.params;
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

module.exports = server;
