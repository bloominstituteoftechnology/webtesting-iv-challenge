const express = require('express')
const Post = require('./Post');

const server = express();
server.use(express.json());
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
})

server.get('/posts', (req, res) => {
    
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})



module.exports = server;