// imports
const express = require("express");

// instantiate server
const server = express();
server.use(express.json());

// endpoints
server.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

server.post("/new", (req, res) => {
  const name = req.body.name;

  res.status(201).json({ user: name });
});

server.delete("/remove", (req, res) => {
  const name = req.body.name;

  res.status(200).json(true);
});

// server port
server.listen(9000, () => {
  console.log("Server runnning on port 9000");
});

module.exports = server;
