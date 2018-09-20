const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/greet/:name", (req, res) => {
    const name = req.params.name;
    const last = red.body.last
  res.status(200).json({ Hello: `${name} ${last}` });
});

module.exports = server;
