const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.json({ api: `running`});
});

module.exports = server;