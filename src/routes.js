const mongoose = require('mongoose');
const User = require('./models.js');

module.exports = (server) => {

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/users');

  server.post('/api/users', (req, res) => {

    const { name, email } = req.body;
    const newUser = new User({ name, email });

    newUser.save()
      .then((response) => {
        res.status(201).json({
          success: true,
          response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          error,
        });
      });

  });

  server.get('/api/users', (req, res) => {

    User.find({})
      .then((response) => {
        res.status(200).json({
          success: true,
          response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          error,
        });
      });

  });

  server.put('/api/users/:id', (req, res) => {

    const { id } = req.params;
    const userData = req.body;

    User.findByIdAndUpdate(id, userData)
      .then((response) => {
        res.status(200).json({
          success: true,
          response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          error,
        });
      });

  });

  server.delete('/api/users/:id', (req, res) => {

    const { id } = req.params;

    User.findByIdAndRemove(id)
      .then((response) => {
        res.status(200).json({
          success: true,
          response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          error,
        });
      });

  });

};
