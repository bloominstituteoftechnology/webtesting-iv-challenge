const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);


const server = express();

server.get('/', (req, res)=> {
    res.status(200).json({message: "Hi :)"});
});






module.exports = server;

// server.listen(3300, ()=> console.log(`API running on port 3300`));