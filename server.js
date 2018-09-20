const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const cors = require('cors'); 
server.use(cors()); 


server.get('/users', (req, res) => {
    db('users')
    .then(res => {
        res.status(200).json(res)
    })
})



