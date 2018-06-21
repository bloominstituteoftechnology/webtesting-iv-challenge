const express = require('express');
const mongoose = require('mongoose');

const app = express();
const User = require('./User');
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

app.get('/api/users', (req, res) => {
  User.find()
    .exec((err, user) => {
      if (err)
        return res.status(500).json(err);

      res.json(user);
    });
})
.post('/api/users', (req, res) => {
  const body = ({ username, password } = req.body);

  User.create(body)
    .exec((err, user) => {
      if (err)
        return res.status(500).json(err);
        // return console.log(err);

      res.status(201).json(user);
    })
})

mongoose.connect('mongodb://localhost/servertesting')
  .then(() => console.log('\n===== DB Connected ====='))
  .catch(err => console.log(`\n===== ERROR =====\n${ err }`));

if (process.env.NODE_ENV !== 'test')
  app.listen(port, () => console.log(`\n\n\n\n\n===== Server listening at http://localhost:${ port }`));

module.exports = app;