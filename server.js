const express = require("express");
const mongoose = require("mongoose");

const User = require("./users/User");

mongoose
  .connect("mongodb://localhost/testingdb")
  .then(mongo => {
    console.log("connected to testingdb");
  })
  .catch(err => {
    console.log("Error connecting to database", err);
  });

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(9000);
}

server
  .route("/users")
  .get((req, res) => {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.json(err);
      });
  })
  .post((req, res) => {
    const userData = req.body;
    const user = new User(userData);
    if (user.username && user.password) {
      user
        .save()
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res.status(500).json({
            errorMessage:
              "There was an error while saving the user to the database."
          });
        });
    } else {
      res.json({
        errorMessage:
          "Please provide a unique username and password for the user."
      });
    }
  });

server
  .route("/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    User.find()
      .then(users => {
        let user = users.filter(user => user._id.toString() === id.toString());
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json(err => {
            message: "The user with the specified ID does not exist.";
          });
        }
      })
      .catch(err => {
        res.status(500).json(err => {
          errorMessage: "The user information could not be retrieved.";
        });
      });
  })
  .delete((req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
      .then(user => {
        if (user) {
          res.status(204).end();
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err =>
        res.status(500).json(err => {
          errorMessage: "The user could not be removed";
        })
      );
  });

module.exports = server;
