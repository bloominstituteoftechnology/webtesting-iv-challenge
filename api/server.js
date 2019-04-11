const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const server = express();

const usersRoute = require('../routes/UsersRoutes/UsersRoutes.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive");
});

server.use('/api/users', usersRoute)

module.exports = server;