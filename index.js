const mongoose = require('mongoose');
const server = require('./server');
const port = 5550;

mongoose.connect('mongodb://localhost/bands', {}, err => {
  if (err) return console.log(err);
  console.log('\n===Connected to database===\n');
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`\n===Server is up on port ${port}===\n`);
});
