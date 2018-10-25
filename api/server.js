const express = require("express");
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server up' });
  });

server.post("/users/:username", (req, res) => {
  const { username } = req.params;
  res.status(200).json({ Username: `${username}` });
});

server.get('/users', (req, res) => {
    const users = req.params;
    res.status(200).json({users});
})

module.exports = server;