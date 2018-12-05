const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Wazzahhhhp');
})

server.post('/flavor/:flavor', (req, res) => {
  const { flavor } = req.params;
  const  dessert = req.body.dessert;

  res.status(201).json({ message: `Me likey ${flavor} ${dessert}` });
});

server.delete('/flavor/:flavor', (req, res) => {
    const { flavor } = req.params;
    res.status(200).json({ message: `${flavor} was removed from the flavor list.` });
});

module.exports = server;