const mongoose = require('mongoose');
const server = require('./server');
const port = 5000;

mongoose.connect('mongodb://localhost/movies', {}, err => {
  if (err) return console.log(err);
  console.log('===  MongoDB Connected ===');
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is connected to port ${port}`);
});
