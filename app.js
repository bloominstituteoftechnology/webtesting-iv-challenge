const mongoose = require('mongoose');
const server = require('./server');
const port = 5550;

mongoose.connect('mongodb://localhost/someserver', {}, err => {
  if (err) console.log(err);
  console.log(`DB connected`);
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`App running on port ${port}.`);
});
