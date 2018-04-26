const mongoose = require('mongoose');
const server = require('./server');
const port = 5000;

mongoose.connect('mongodb://localhost/bands', {}, err => {
  if (err) return console.log(err);
  console.log('Connected to Mongo');
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server running on ${port}`);
});
