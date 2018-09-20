const express = require('express');

const server = express();
server.use(express.json());

let posts = [
  {
    id: 0,
    text: 'Example Text'
  },
  {
    id: 1,
    text: 'Example Text'
  },
  {
    id: 2,
    text: 'Example Text'
  },
];

let id = 3;

const getId = () => {
  return id++;
}

server.get('/', (req, res) => {
  res.status(200).json(posts);
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
