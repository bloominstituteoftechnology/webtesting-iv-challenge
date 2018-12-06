const express = require('express');

const server = express();

server.use(express.json());

const testDB = [];

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/user', (req, res) => {
  
 testDB.push( req.body);
 const id = testDB.length -1; 

  res.status(200).json(testDB[id]);
   
});

server.delete('/user', (req, res) => {
 
   res.status(200).json(testDB.pop());
     // { name: 'Tom'});
   // res.status(200).json({ hello: 'Ryan Clausen' });
 });

const port = process.env.PORT || 9000;

module.exports = server;
