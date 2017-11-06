const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/mods', {}, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connected to Super Mario 64 Mods');
});

server.listen(3000, () => {
  console.log('server listening on port 3000')
});