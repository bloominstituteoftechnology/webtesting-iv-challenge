const express = require('express');

const server = express();

server.get('/', (req, res) => {
    // console.log("server yay")
  res.status(200).json({ api: 'running' });
});




module.exports = server;
// server.listen(5000, () => console.log('Example app listening on port 5000!'))
