const express = require('express');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(morgan('dev'));


server.get('/api/dbz-chars', (req, res) => {
    res.status(200).json({ running: 'The api is good to go' });
});

module.exports = server;
