const express = require('express');
const server = express();

server.use(express.json());

// R O O T
server.get('/', (req, res) => {
  res.status(200).json({ message: 'we up' });
});

server.post('/submit', (req, res) => {
  const { name, title } = req.body;
  res.status(200).json({ submitted: `${name} - ${title}` });
});

module.exports = server;
