const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/greet", (req, res) => {
  const { firstname, lastname } = req.body;

  res.status(200).json({ hello: `${firstname} ${lastname}` });
});

const port = process.env.PORT || 9000;

module.exports = server;
