const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/animal', {}, (err) => {
  if (err) return console.log(err);
  console.log('Connected to the Animal DB');
})

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});