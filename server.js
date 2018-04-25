const express = require('express');
// const bodyParser = require('body-parser');
const morgan = require('morgan');

const server = express();


server.use(morgan('dev'));
server.use(express.json());


// initial rout for GET

server.get('/', (req, res) => {
  res.json(' Sever is working ... ')
});



// Our use of routes


module.exports = server;