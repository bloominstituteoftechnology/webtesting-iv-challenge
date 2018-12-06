const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('hello')

})


const port = process.env.PORT || 5000;


module.exports = server;
