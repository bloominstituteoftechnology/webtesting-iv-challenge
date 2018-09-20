const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/hello", (req, res) => {
  res.status(200).json({ hello: "FSW12" });
});

server.post("/greet/:name", (req, res) => {
  const first = req.params.name;
  const last = req.body.last;
  res.status(200).json({ hello: `${first} ${last}` });
});

module.exports = server;
