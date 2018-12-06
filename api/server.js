const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

// server.post('/greet', (req, res) => {
//   const { firstName, lastName } = req.body;

//   res.status(200).json({ hello: `${firstName} ${lastName}` });
// });


module.exports = server;