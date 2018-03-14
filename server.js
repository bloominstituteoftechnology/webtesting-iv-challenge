const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();
const Marsupial = require('./models/marsupial');

server.use(morgan('combined'));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'The server arises from the depths of the sea!' });
});

mongoose
    .connect("mongodb://localhost/Marsupials")
    .then(db => {
        console.log(`Successfully connected to the ${db.connections[0].name} database`);
    });

module.exports = server;