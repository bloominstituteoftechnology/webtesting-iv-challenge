const express = require('express');

const server = express();
server.use(express.json());

let store = [];
let nextId = 1;

server.get('/', (req, res) => {
  res.status(200).end();
});

server.post('/posts', (req, res) => {
  const { content, title, userId } = req.body;
  if (!(content && title && userId)) {
    return res.status(401).json({ message: 'This resource could not be created, as it did not include all required fields.' });
  }
  store.push({ content, title, userId, id: nextId });
  res.status(201).json({ id: nextId });
  return nextId++;
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  debugger;
  const firstLength = store.length;
  store = store.filter(post => post.id !== Number(id));
  const deletedNum = firstLength - store.length;
  if (deletedNum > 0 ) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Did not find the requested resource to delete' });
  }
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
