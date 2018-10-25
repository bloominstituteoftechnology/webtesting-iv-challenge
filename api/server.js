// require('dotenv').config();
const express = require('express');
const server = express();
server.use(express.json());

// CONFIG: server settings
const serverPort = process.env.PORT || 7100; // server port
const serverName = `Backend Testing`; // Name of server to display at "/" endpoint 
const projectPullRequest = ``;

// ENDPOINTS
server.get('/', (req, res) => { // sanity check root endpoint
  res.send(`${serverName} running on port ${serverPort}<br>More information: <a href="${projectPullRequest}">n/a</a>`);
});

server.post("/api/:test", (req, res) => {
  const { test } = req.params;
  res.status(201).json({ message: `${test}` });
});

server.delete("/api/:test", (req, res) => {
  const { test } = req.params;
  res.status(204).json({ message: `${test}` });
})

server.put("/api/:test", (req, res) => {
  const { test } = req.params;
  res.status(204).json({ message: `${test}` });
})

module.exports = server;