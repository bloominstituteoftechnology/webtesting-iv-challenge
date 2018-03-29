const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/shows', err => {
   if(err) return console.error(err);
   console.log('connected to shows DB');
});

server.listen(7000, () => {
   console.log('server listening on port 7000');
});