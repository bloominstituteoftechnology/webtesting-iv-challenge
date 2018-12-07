const express = require("express");

const server = express();

server.use(express.json());

// make sure server works endpoint
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/hello", (req, res) => {
  const { firstName, lastName } = req.body;

  res.status(200).json({ hello: `${firstName} ${lastName}` });
});

server.delete("/hello", (req, res) => {
  res.status(200).json({ test: "passed" });
});

module.exports = server;
