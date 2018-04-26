const express = require('express');
//const bodyparser = require('body-parser');
const morgan = require('morgan');
const server = express();
const Battlefield = require('./battlefield');

server.use(express.json());
server.use(morgan('dev'));

server.get('/api/battlefield', (req, res) => {
  Battlefield.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => res.status(404).json({ error: 'error in get' }));
});

server
  .put('/api/battlefield/', (req, res) => {
    const updatedUser = {name, kills, deaths} = req.body;
    const {id} = req.body;
    battlefield
      .findById({id})
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((error) => {
        res.status(500).json({message: "There was an error getting data from the database "});
      });
  })

server.post('/api/battlefield', (req, res) => {
  const battlefield = new Battlefield(req.body);

  battlefield
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(error => res.status(500).json({ error: 'error in post' }));
});

module.exports = server;
