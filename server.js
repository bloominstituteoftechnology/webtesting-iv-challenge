const express = require('express');
const bp = require('body-parser');
const morgan = require('morgan');
const server = express();
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/test_users')

server.use(morgan('tiny'));
server.use(bp.json());

// Write your Routes Here! 

server.post('/api/register', (req, res) => {
    res.status(200).json({ id: 1 });
});

server.post('/api/login', (req, res) => {
    res.status(200).json({ aboutme: 'Test' });
});

module.exports = server;