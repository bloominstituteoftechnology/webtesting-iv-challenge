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

server
  .route('/users/:id')
  .put((req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    if (username === undefined && password === undefined) {
      return res.status(422).json('must have update values');
    }
    const updateObj = {};
    if (username) updateObj.username = username;
    if (password) updateObj.password = password;
    
    User.findByIdAndUpdate(id, updateObj, { new: true }, (err, update) => {
      if (err) res.status(422).json(err);
      res.json(update);
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err, success) => {
      if (err) res.status(500).json(err);
      res.json(success);
    });
  });

module.exports = server;
