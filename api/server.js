const express = require('express');;

const server = express();

server.use(express.json());

const xfilesRoute = require('../xfiles/xfilesRoute');

server.use('/chars', xfilesRoute); 
//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ message: 'it\'s ALIVE!' });
})




module.exports = server;
