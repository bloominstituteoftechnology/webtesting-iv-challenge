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

//   const friend = new Friend(req.body);
//   friend
//     .save()
//     .then(saveFriend => {
//       res.status(200).json(saveFriend);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });

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
