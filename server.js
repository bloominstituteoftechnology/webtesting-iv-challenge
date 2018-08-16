const express = require('express');

const server = express();
server.use(express.json());

const store = [];
let nextId = 1;

server.get('/', (req, res) => {
  res.status(200).end();
});

server.post('/posts', (req, res) => {
  const { content, title, userId } = req.body;
  store.push({ content, title, userId, id: nextId });
  res.status(201).json({ id: nextId });
  nextId++;
});

server.use((err, req, res, next) => {
  if (err instanceof 'notFound') {
    res.status(404).json({ message: 'Did not find the specified path' });
  } else {
    console.log(err);
    next(err);
  }
});

module.exports = server;
