const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.json('API Running...');
});

server.post('/api/dogs', (req, res) => {
    const dog = req.body;
    if (!dog.breed) {
        res.status(400).json({ error: "Please provide a breed for the dog." })
    } else
        db.insert(dog)
        .into('dogs')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the dog." }))
    });

server.get('/api/dogs', (req, res) => {
    db('dogs')
    .then(dogs => {
        res.status(200).json(dogs)
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/dogs/:id', (req, res) => {
    const {id} = req.params;
    db('dogs').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The dog with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
});


module.exports = server;