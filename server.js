const express = require('express');

const server = express();

server.get('/', (req, res) => {
    console.log("server yay")
  res.status(200).json({ api: 'running' });
});

server.listen(5000, () => console.log('Example app listening on port 5000!'))

module.exports = server;