const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models');


const server = express();
server.use(morgan('combined'));
server.use(express.json());

server.get('/api/user', (req, res) => {
    User.find({},(err, resp) =>{
        res.send(resp);
    });
});
server.post('/api/user', (req, res) => {
    const user = new User(req.body);
    user.save((err, newUser) =>{
        res.send(newUser);
    });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://germancin:secure123@159.65.170.21/users')
    .then(conn => console.log('Connected to MongoDB - Server:159.65.170.21 DB:users'))
    .catch(err => console.log('error :::: ' + err));

module.exports =  server;