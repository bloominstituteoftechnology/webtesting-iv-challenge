const mongoose = require('mongoose');
const server = require('./server.js');
const port = 5000;

mongoose.connect('mongodb://localhost/Meta', () => {
  console.log('Connected to DB: MTG Meta');
});

server.listen(port, () => {
  console.log(`Server on ${port}`);
});
