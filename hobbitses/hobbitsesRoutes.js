const express = require("express");

const server = express();

const hobbitses = require("./hobbitsesModel");

server.use(express.json());

server.post("/hobbitses", (req, res) => {
  const { name } = req.body;

  hobbitses
    .insert(name)
    .then(id => {
      res.status(201).json({ id });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
