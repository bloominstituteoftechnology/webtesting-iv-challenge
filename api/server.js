const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

server.get('/api/ice-cream', (req, res) => {

})

server.post('/api/ice-cream', (req, res) => {
  let { flavor, scoops } = req.body;

  res.status(201).json({ yourOrder: `One ${flavor}, ${scoops} scoops` });
});

module.exports = server;