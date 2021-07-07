const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/hello", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/greet/:name", (req, res) => {
  const first = req.params.name;
  const last = req.body.last;
  res.status(200).json({ hello: `${first} ${last}` });
});

server.post("/skills", (req, res) => {
  const name = req.body.name;
  const skills = req.body.skills;

  res.status(200).json({ name, skills });
});

server.delete("/skills", (req, res) => {
  const skills = req.body.skills;

  res.status(200).json({ skills });
});

module.exports = server;
