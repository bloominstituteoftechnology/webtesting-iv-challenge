const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/friends', (req, res) => {
  let { first, last } = req.body;

  if (!first || !last)
    return res.status(400).json('Missing first or last name or both.');

  return res.status(201).json({ id: 1, first, last });
});

server.delete('/friends/:id', (req, res) => {
  let id = req.params.id;

  if (id < 5) return res.status(200).json(1);

  return res.status(400).json(0);
});

// const port = 8500;
// server.listen(port, function() {
//   console.log(`\n === Web API Listening on http://localhost:${port}===`);
// });

module.exports = server;
