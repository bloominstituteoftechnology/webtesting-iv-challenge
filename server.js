const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const server = express();
const routes = require('./app/routes.js');

mongoose.connect('mongodb://localhost/showsdb').then(() => {
  console.log('====connected to mongo====');
});

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/shows', routes);

server.get('/', (req, res) => {
  res.send('api is working');
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('api running on 5000');
});
