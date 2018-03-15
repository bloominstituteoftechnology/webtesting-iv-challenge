const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

//server.get

//server.post
// req.body === newUser
//server.put
// req.body === update
// {name: 'Romeo', location: 'Hungary'}
// User.find(req.body.name).update(req.body)

//server.delete
// req.body = {name: 'Romeo'}
// User.find(req.body).del()

module.exports = server;