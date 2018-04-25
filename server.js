const express = require("express");
const morgan = require("morgan");

const server = express();
server.use(express.json());
server.use(morgan("dev"));

const Bee = require("./models/BeeModel");

server.get("/api/bees", (req, res) => {
  Bee.find().then((err, bees) => {
    console.log(bees);
    if (err) {
      res.status(500).json(err);
    }
    res.json(bees);
  });
});

server.post("/api/bees", (req, res) => {
  res.status(201).json(req.body);
});

server.put("/api/bees/:id", (req, res) => {
  res.status(200).json(req.body);
});

server.delete("/api/bees/:id", (req, res) => {
  res.status(200).json("Success");
});

module.exports = server;
