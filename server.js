const express = require("express");
const server = express();

server.use(express.json());

const teams = [
  { id: 0, name: "Manchester United" },
  { id: 1, name: "Liverpool" },
  { id: 2, name: "Arsenal" }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/teams", (req, res) => {
  res.status(200).json(teams);
});

server.post("/teams", (req, res) => {
  const { name } = req.body;
  const id = teams.length;
  teams.push({ id, name });
  res.status(200).json(teams);
});

server.delete;

module.exports = server;
