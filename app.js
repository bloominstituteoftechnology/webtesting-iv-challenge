const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/bands', {}, err => {
  if (err) return console.log(err);
  console.log('CONNECTED TO BANDS DB');
});

const port = process.env.PORT || 6000;

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running on ${port}`);
});
