const express = require("express");

const server = express();

server.use(express.json());

// make sure server works endpoint
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
