const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/createUser', async (req, res) => {
    const newName = req.body.name;
    try {
        const returned = await db('users').insert({ name: newName });// have to pass in obj, not string
        console.log(returned);
        res.status(201).json({ returned: returned });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const returned = await db('users').where({ id: userId }).del();
        console.log(returned);
        res.status(200).json({ returned: returned });

    } catch(err) {
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 9000;

module.exports = server;