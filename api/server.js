
const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/api/books', (req, res) => {
    db('books')
    .select('id','title')
    .then(books => {
        res.json(books);
    })
    .catch(err => res.send(err));
})

server.post('/api/books', (req, res) => {
    const { title } = req.body;
       db('books')
       .insert({ title })
       .then(() => {
           res.status(200).json({message: 'successfully posted book title'})
       })
       .catch(err => {
        res.status(400).json({message: 'error posting title'})
       })
    }
)

server.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    db('books')
    .where({ id: id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => {
        res.status(404).json({message: 'failed to delete'})
    })
    });



module.exports = server;

