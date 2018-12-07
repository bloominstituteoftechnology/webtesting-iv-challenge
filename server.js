const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "working" });
});

const port = 9000;

module.exports = server;
