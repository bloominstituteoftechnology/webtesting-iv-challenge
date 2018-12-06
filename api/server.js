const express = require('express');

const server = express();

server.use(express.json());

//BASIC ROUTE ENDPOINT..
server.get('/', (req, res) => {
       res.status(200).json({Message:  'SERVER  RUNNING.'});
})

server.post('/greet', (req, res) => {
       if(req.body) {
              res.status(200).json({Hello : `${req.body.firstName} ${req.body.lastName}`})
       } else {
              res.status(400).json({message : "Bad request.."});
       }
})

server.delete('/user/:id', (req, res) => {
       const id = req.params.id;
       res.status(202).json({ message: "Post has been deleted" })     
})

module.exports = server;