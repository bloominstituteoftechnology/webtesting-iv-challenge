const express = require('express');
const server = express();
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);

server.use(express.json());

server.post('/cats', async (req, res) => {
    const cats = req.body;
    if (cats.name) {
        const posted = await db('cats').insert(cats);

        res.status(201).json(posted);
    } else {
        res.status(400).json({ message: 'need a name' })
    }
   
});

server.get('/cats', (req, res) => {
    db('cats')
        .then(cats => res.json(cats))
        .catch(err => { res.status(500).json({ message: 'Unable to find cats' }) })
});


server.delete('/cats/:id', (req, res) => {
    const { id } = req.params;
    db('cats').where('id', id).del()
        .then(ids => { res.status(201).json(ids) })
        .catch(err => { res.status(404).json({ message: "Unable to delete cat" }) })
});

module.exports = server;