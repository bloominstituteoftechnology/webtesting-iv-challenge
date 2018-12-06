const express = require("express");

const server = express();

server.use(express.json());

// sanity check
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

const port = process.env.PORT || 7000;

module.exports = server;
