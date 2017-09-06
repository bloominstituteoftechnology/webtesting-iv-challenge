const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/animals', {}, (err) => {
  if (err) return console.log(err);
  console.log('Connected to DB');
});

server.listen(3030, () => {
  console.log('Server up and running on 3030');
});