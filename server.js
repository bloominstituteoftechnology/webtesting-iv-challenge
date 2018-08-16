const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
  // res.status(200).send( 'running' );

});

server.post('/greet', (req, res) => {
  const { name } = req.body;

  res.status(200).json( { hello: name });
})

module.exports = server;