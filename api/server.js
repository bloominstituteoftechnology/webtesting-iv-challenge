const express = require('express');
const server = express();

// api testing
server.get('/', (req, res) => {
    res.status(200).json({api: "running..."})
});

module.exports = server;