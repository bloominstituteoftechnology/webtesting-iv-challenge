const express = require('express');
const port = process.env.PORT || 9000;
const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
}

module.exports = server;
