const express = require("express");
const db = require("../data/dbConfig");
const server = express();
server.use(express.json());

// sanity check
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/scrubs", (req, res) => {
  const character = req.body;
  db("characters")
    .insert(character)
    .then(id => {
      res.status(201).json({ id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/scrubs/:id", (req, res) => {
  const charId = req.params.id;
  db("characters")
    .where({ id: charId })
    .del()
    .then(count => {
      count ? res.status(200).json(count) : res.status(404);
    })
    .catch(err => res.status(500));
});

const port = process.env.PORT || 7000;

module.exports = server;
