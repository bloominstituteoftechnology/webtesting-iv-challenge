const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./data/dbConfig');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors({}));

server.get('/', async (req, res) => {
  try{
    const posts = await db('posts');
    res.status(200).json(posts);
  } catch (e){
    console.log(e);
  }  
});

server.post('/', (req, res) => {
  const { text } = req.body;
  if(!text) return res.status(422).json({ error: 'Invalid data' });
  const newId = getId();
  posts.push({ id: newId, text });
  const newPost = posts.find(post => post.id === newId);
  res.status(201).json(newPost);
});

server.delete('/:id', (req, res) => {
  const delId = req.params.id;
  const delPost = posts.filter(post => parseInt(post.id, 10) === parseInt(delId, 10));
  if(!delPost.length) {
    return res.status(404).json({ error: 'No post with that id' });
  }
  posts = posts.filter(p => parseInt(p.id, 10) !== parseInt(delId, 10));
  res.status(200).json({ id: delId });
});

module.exports = server;
