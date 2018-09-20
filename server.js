const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/friends', (req, res) => {
  const first = req.body.first;
  const last = req.body.last;
  res.status(201).json({ first, last });
});

const port = 8500;
server.listen(port, function() {
  console.log(`\n === Web API Listening on http://localhost:${port}===`);
});

module.exports = server;
