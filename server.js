const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => res.send("Welcome!"));

server.post("/users", (req, res) => {
  if (req.body.name) {
    res
      .status(201)
      .json({ message: `Hello ${req.body.name}, welcome to server testing!` });
  } else {
    res.status(400).json({ message: "Please provide a name." });
  }
});

server.delete("/users", (req, res) => {
  res.status(200).json({ message: "User deleted." });
});

module.exports = server;
