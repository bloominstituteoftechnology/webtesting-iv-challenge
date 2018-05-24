const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Server running!' });
  });
  
  if (process.env.NODE_ENV !== 'test') {
    const port = 8000;
    server.listen(port, () => {
        console.log(`Server running port ${port}`)
    });
  };

module.exports = server;