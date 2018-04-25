const express = require('express');
//const bodyparser = require('body-parser');
const morgan = require('morgan');
const server = express();
const Battlefield = require('./battlefield');

server.use(express.json());
server.use(morgan('dev'));

server
    .get('/api/battlefield',(req, res) => {
        Battlefield
            .find({}, (error, username) => {
                if (error) {
                    res.status(500).json('Error finding the battlefield user');
                }
                res.json(username);
            })
    })

module.exports = server;