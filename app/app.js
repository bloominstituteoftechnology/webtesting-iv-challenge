const mongoose = require('mongoose')
const server = require('./server')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/games', { useMongoClient: true }, () => {
  console.log('connected to the games database');
})

server.listen(3000, () => {
  console.log('server is listening on port 3000');
})