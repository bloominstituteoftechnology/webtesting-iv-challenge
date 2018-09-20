const express = require('express');

const server = express();
server.use(express.json());

const posts = [
  {
    id: 0,
    text: 'Example Text'
  },
];

let id = 1;

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

module.exports = server;
