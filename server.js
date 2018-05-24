const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ API: 'Running!' })
});

if(process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;