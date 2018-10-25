const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ API: 'We running young padawans!!' });
});

server.post('/celeb', (req, res) => {
  const name = req.body.celebrity;
  const profession = req.body.profession;
  res.status(201).json({ 
      id: 1,
      name: `${name}`,
      profession: `${profession}`
   });
  });

  server.delete('/celeb/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ id });
});

module.exports = server;