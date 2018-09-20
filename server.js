const express = require("express");
const server = express();

server.use(express.json());

let teams = [
  { id: 0, name: "Manchester United" },
  { id: 1, name: "Liverpool" }
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

server.delete("/teams/:id", (req, res) => {
  const { id } = req.params;

  if (teams.find(team => Number(team.id) === Number(id))) {
    teams = teams.filter(team => {
      return Number(team.id) !== Number(id);
    });
    res.status(200).json(teams);
  } else {
    res.status(400).json({ message: "invalid team id" });
  }
});

module.exports = server;
