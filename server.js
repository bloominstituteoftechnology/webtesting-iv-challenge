const express = require('express');
const mongoose = require('mongoose')
const server = express();
server.use(express.json());
// server.use(helmet())

mongoose.
  connect('mongodb://localhost:27017/testingDb')
  .then(res => {
    console.log('connected to testingDb')
  })
  .catch(err => {
    console.log('msg:', err)
  })




server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

const usersRoute = require('./usersRoute.js')
server.use("/users", usersRoute)




if (process.env.NODE_ENV !== 'test') {
  server.listen(5000, () => {
    console.log('server listening on 5000')
  })
}

module.exports = server; 