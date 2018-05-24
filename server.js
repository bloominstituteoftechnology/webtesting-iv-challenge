const express = require('express');
const server = express();

// mongoose
//   .connect('mongodb://localhost/persondb')
//   .then(mongo => {
//     console.log('connected to database');
//   })
//   .catch(err => {
//     console.log('Error connecting to database', err);
//   });

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

server.post('/', (req, res) => {
    res.status(200).json({ api: 'posted!' });
});

server.delete('/', (req, res) => {
    res.status(200).json({ api: 'deleted!' });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;