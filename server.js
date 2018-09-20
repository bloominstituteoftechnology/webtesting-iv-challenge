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

module.exports = server;
