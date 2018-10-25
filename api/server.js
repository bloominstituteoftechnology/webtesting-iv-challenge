const express = require("express");

const server = express();

server.use(express.json());

//sanity check
server.get("/", (req, res) => {
  res.send("server is up");
});

server.post("/create", (req, res) => {
  const name = req.body.name;
  res.status(200).json({ user: name });
});

server.delete("/delete", (req, res) => {
  const name = req.body.name;
  res.status(200).json(true);
});

module.exports = server;
