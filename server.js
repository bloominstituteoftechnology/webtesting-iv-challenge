const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
  // res.status(200).send( 'running' );

});

server.post('/names', (req, res) => {
  const { name } = req.body;

  res.status(200).json( { hello: name });
})

server.post('/names/:name', (req, res) => {
  const { lastName } = req.body;
  const { name } = req.params;

  res.status(200).json({ hello: `${name} ${lastName}` });
});

server.delete('/names/:name', (req, res) => {
  let { name } = req.body
  name ? res.status(404).json({ error: 'Name not found' }) : null

  res.status(204)
})

module.exports = server;