const express = require('express');
const server = express();
server.use(express.json());
const db = require('../database/dbConfig')

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/create-user',(req,res) => {
    const user = req.body;
    db('users').insert(user)
    .then(userId => {
        res.status(200).json(userId)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

server.delete('/delete-user/:id', (req,res) => {
    const { id } = req.params;

    db('users').remove(id)
        .then(count => {
            res.status(201).json({message : `${count} user was deleted`, id : `${id}`})
        })
        .catch(error => {
            res.status(500).json({error : `there was an error deleting the user : ${error}`})
        })
})



module.exports = server;
