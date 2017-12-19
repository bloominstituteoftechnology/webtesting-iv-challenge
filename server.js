const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const User = require('./models.js');

const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

/* *** routes *** */
server.get('/foo', (req, res) => {
  res.send('bar');
});

server
  .route('/users')
  .get((req, res) => {
    User
      .find({})
      .then(users => res.json(users))
      .catch(err => res.json(err));
  })
  .post((req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    newUser
      .save()
      .then(nUser => res.json(nUser))
      .catch(err => res.status(500).json(err));
  });

module.exports = server;
