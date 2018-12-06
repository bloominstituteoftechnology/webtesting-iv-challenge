const express = require('express');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/createUser', async (req, res) => {

});

const port = process.env.PORT || 9000;

module.exports = server;