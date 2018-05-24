// import express 
const express = require('express');
const router = require('./routes/routes');

//import mongoose
const mongoose = require('mongoose');

// set server variable
const server = express(); 

//set up /api/
server.use(express.json())
server.use('/api/videogames', router);

//connect to mongoose
mongoose.connect('mongodb://localhost/servertest', {}, err => {
    if (err) return console.log(err);
    console.log('Connected to database!');
})

// initial route
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

//set port
if (process.env.NODE_ENV !== 'test') {
  server.listen(4000);
}

//export
module.exports = server;