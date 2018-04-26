const express = require("express");
const morgan = require("morgan");

const server = express();
server.use(express.json());
server.use(morgan("dev"));

const Bee = require("./models/BeeModel.js");

server.get("/api/bees", (req, res) => {
  Bee.find()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/api/bees", (req, res) => {
  console.log(req.body);
  const newBee = new Bee(req.body);
  newBee
    .save()
    .then(savedBee => {
      Bee.find((err, allBees) => {
        if (err) {
          res.json(err);
        }
        res.status(201).json(allBees);
      });
    })
    .catch(err => {
      res.status(422).json(err);
    });
});

server.put("/api/bees/:id", (req, res) => {
  Bee.findByIdAndUpdate(req.params.id, req.body, (err, updatedBee) => {
    if (err) {
      return console.log(err);
    }
    Bee.findById(req.params.id, (err, updatedBee) => {
      if (err) {
        return console.log(err);
      }
      res.json(updatedBee);
    });
  });
});

server.delete("/api/bees/:id", (req, res) => {
  Bee.findByIdAndRemove(req.params.id, (err, removedBee) => {
    if (err) {
      return console.log(err);
    }
    res.json(removedBee);
  });
});

module.exports = server;
