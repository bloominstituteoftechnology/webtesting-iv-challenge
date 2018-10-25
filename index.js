const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

// server setup

const server = express();
const db = knex(knexConfig);
server.use(express.json());

// server instantiation

const port = 8000;

server.listen(port, () => console.log('Server listening on port 8000.'));
