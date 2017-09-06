const mongoose = require('mongoose');
const server = require('./server');
const config = require('./.config');

mongoose.connect(config.db , { useMongoClient: true}, (err) => {
  if (err) return console.log(err);
   console.log('database connected and ready to use');
});

server.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
})
