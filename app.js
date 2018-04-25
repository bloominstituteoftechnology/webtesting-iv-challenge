const mongoose = require('mongoose');
const server = require('./server.js');
const port = 5000;

mongoose.connect('mongodb://localhost/LocalMeta', () => {
  if (err) return console.log(err);
  console.log('Connected to DB: Local Meta');
});

server.listen(port, () => {
  if (err) console.log(err);
  console.log(`Server on ${port}`);
});
