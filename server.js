const express = require('express');
const morgan = require('morgan');
const server = express();
const Char = require('./charModel');

server.use(express.json());
server.use(morgan('dev'));


server.get('/api/dbz-chars', (req, res) => {
    res.status(200).json({ running: 'The api is good to go' });
});

server.post('/api/dbz-chars/add', (req, res) => {
  const { name, race, planet } = req.body;
  const newChar = new Char({ name: name, race: race, planet: planet });

  newChar
    .save()
    .then(savedChar => {
      res.status(200).json(savedChar);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/api/dbz-chars/:name', (req, res) => {
  const { name } = req.params;
  const { race, planet } = req.body;

  Char
    .findOneAndUpdate({ name: name }, { race: race, planet: planet }, { new: true })
    .then(updatedChar => {
      console.log(updatedChar);
      if (!updatedChar) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(updatedChar);
    })
    .catch(err => {
      res.status(500).json(err);
    });


});

module.exports = server;
