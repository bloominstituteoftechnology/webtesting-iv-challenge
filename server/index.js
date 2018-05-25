const server = require('./server')
const mongoose = require('mongoose')

// Start the server in a separate file to decouple server 
// implementation and usage
mongoose.connect('mongodb://localhost/testingdb')
  .then(() => server.listen(3000, 'Listening on port 3000'))