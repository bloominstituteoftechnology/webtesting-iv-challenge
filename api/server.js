const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is operational, keep working!' });
});

server.post('/players/:character', (req, res) => {
  const { character } = req.params;
  const jobClass = req.body.jobClass || 'Peasant';

  res.status(200).json({ hello: `${character} the ${jobClass}` });
});

module.exports = server;