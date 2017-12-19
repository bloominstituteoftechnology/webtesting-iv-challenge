const mongoose = require('mongoose');
const server = require('./server');
const port = process.env.port || 5002; 

mongoose.connect('mongodb://localhost/walmart', { useMongoClient: true }, () => {
  console.log('connected to walmart DB');
});

server.listen(port, () => {
  console.log('server listening on port ' + port);
});