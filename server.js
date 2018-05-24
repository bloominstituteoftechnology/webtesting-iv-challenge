const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = express();
const User = require("./User");

server.use(bodyParser.json());

mongoose.connect("mongodb://localhost/testinusers", {}, err => {
  if (err) return console.log(err);
  console.log("DB Connected");
});

server.get("/", (req, res) => {
  res.status(200).json({ api: "running!" });
});

server.get("/users", (req, res) => {
  User.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/users/:id", (req, res) => {
  const update = req.body;
  User.findByIdAndUpdate(req.params.id, update)
    .then(response => {
      User.findById(req.params.id)
        .then(updates => {
          res.status(200).json(updates);
        })

        .catch(err => {
          res.status(404).json({ Error: "User Not Found" });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/users/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(response => res.json({ status: "success" }))
    .catch(err => res.status(500).json(err));
});

if (process.env.NODE_ENV !== "test") {
  server.listen(9000);
}

module.exports = server;
