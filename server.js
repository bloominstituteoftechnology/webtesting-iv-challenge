const express = require("express");
const server = express();
const fightersArray = require("./data/fighters.js");

server.use(express.json());

// test endpoint
server.get("/", (req, res) => {
  const passedBody = { api: "running" };
  res.status(200).json(passedBody);
});

// DBZ endpoints
// GET all
server.get("/fighters", (req, res) => {
  res.status(200).json(fightersArray);
});
// GET individual
server.get("/fighters/:id", (req, res) => {
  const { id } = req.params;
  let fighter = [];
  for (let i = 0; i < fightersArray.fighters.length; i++) {
    if (fightersArray.fighters[i].id === id) {
      fighter.push(fightersArray.fighters[i]);
    }
  }
  res.status(200).json(fighter);
  // res.status(200).json({ working: "Yes" });
});

// POST (create) new fighter
server.post("/fighters/", (req, res) => {
  const id = fightersArray.fighters.length.toString();
  const { name, race } = req.body;
  const newFighter = { id, name, race };
  fightersArray.fighters.push(newFighter);
  res.status(200).json(fightersArray.fighters);
});

// DELETE fighter
server.delete("/fighters/:id", (req, res) => {
  const { id } = req.params;
  let newFightersArray = [];
  for (let i = 0; i < fightersArray.fighters.length; i++) {
    if (fightersArray.fighters[i].id !== id) {
      newFightersArray.push(fightersArray.fighters[i]);
    }
  }
  res.status(200).json(newFightersArray);
});
module.exports = server;
