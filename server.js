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
  res.status(200).json(`${name} Deleted`);
});

server.put("/greet/:id", (req, res) => {
  const { name, id } = req.body;
  if (!name || !id) {
    res.status(400).json({ error: "Please put in a name or id" });
  }
  res.status(200).json({ name: name, id: id });
});

module.exports = server;
