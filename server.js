// import express 
const express = require('express');

// set server variable
const server = express(); 

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