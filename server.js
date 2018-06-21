const express = require('express');
const mongoose = require('mongoose');
const Freind = require('./friends/friend');

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({api: 'up and running'})
});

server.post('/friends', (req, res,) => {
   console.log(req.body)
   const {name, location, profession, age, comments} = req.body;
   const friend = new Friend({name, location, profession, age , comments})
   friend.create().then((response) => {
       res.status(200).send(response)
   }, (e) => {
       res.status(400).json(e)
   })
   
});

module.exports = server;