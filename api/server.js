const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req,res) => {
   res.status(200).json({Running: `Server is up and running`});
});

server.get('/users', (req,res) => {
   res.status(200).json({name:'venky', age:39, married:true});
});

module.exports = server;