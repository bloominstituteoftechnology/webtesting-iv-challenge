const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();
server.use(morgan('combined'));
server.use(express.json());


server.get('/users', (req, res) => {
    res.json('Hello World');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://germancin:secure123@159.65.170.21/users')
    .then(conn => console.log('Connected to MongoDB - Server:159.65.170.21 DB:users'))
    .catch(err => console.log('error :::: ' + err));

module.exports =  server;