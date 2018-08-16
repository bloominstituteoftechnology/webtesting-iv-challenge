const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/greet", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ hello: name });
});

server.post("/greet/:name", (req, res) => {
  const { name } = req.params;
  res.status(201).json({ hello: name });
});

server.delete("/greet/:name", (req, res) => {
  const { name } = req.params;
  res.status(400).json("Frodo Deleted");
});
module.exports = server;
