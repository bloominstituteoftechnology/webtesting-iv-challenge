const express = require("express");
const server = express();
const fighters = require("./data/fighters.js");

server.use(express.json());

// test endpoint
server.get("/", (req, res) => {
  const passedBody = { api: "running" };
  res.status(200).json(passedBody);
});

// DBZ endpoints
server.get("/fighters", (req, res) => {
  res.status(200).json(fighters);
});

module.exports = server;
