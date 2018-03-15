const express = require("express");
const morgan = require("morgan");

const server = express();
server.use(morgan("combined"));
server.use(express.json());

const User = require("./users");

server.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

server.post("/users", (req, res) => {
  const { name, location } = req.body;
  const newUser = new User({ name, location });
  newUser
    .save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);
    });
});
server.put("/users", (req, res) => {
  const { name, location } = req.body;
  User.update({ name }, req.body)
    .then(user => {
      User.find({ name })
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

server.delete("/users", (req, res) => {
  const { name, location } = req.body;
  User.find({ name })
    .remove()
    .then(res => {
      res.status(200).json({ message: `Successfully deleted ${name}.` });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = server;
