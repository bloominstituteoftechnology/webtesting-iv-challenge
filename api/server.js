const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

// const knexConfig = require('./knexfile.js');
// const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

const helperMethods = require('./helper-methods.js');

server.get('/', (req,res)=>{
    helperMethods.getData()
        .then(data =>{
            res.status(200).json(data);
        })
        .catch(err=>res.status(500).json(err));
});

server.post('/hello/:name', (req,res)=>{
    const {name} = req.params;
    const lastName = req.body.lastName;
    res.status(201).json({hello: `${name} ${lastName}`});
})

server.delete('/hello/:name', (req,res)=>{
    const {name} = req.params;
    // const lastName = req.body.lastName;
    res.status(201).json({deleted: `${name}`});
})

server.put('/hello/:name', (req,res)=>{
    const {name} = req.params;
    const lastName = req.body.lastName;
    res.status(200).json({updated: `${name} ${lastName}`});
})

module.exports = server;