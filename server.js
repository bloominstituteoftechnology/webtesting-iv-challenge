const express = require("express");

const server = express();

const User = require("./users/Users");

const mongoose = require("mongoose");

// connect to mongo
mongoose
  .connect("mongodb://localhost/testingdb")
  .then(mongo => {
    console.log("connected to the database");
  })
  .catch(err => {
    console.log("Error connecting to database", err);
  });

if (process.env.NODE_ENV !== "test") {
  server.listen(9000, () => console.log(`\n=== API up on port: 9000 ===\n`));
}
server.use(express.json());
//server.use('/api/users', userController);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running!" });
});
server.delete("/", (req, res) => {
  res.status(200).send("Delete successfully");
});

server.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json(
          { errorMessage: "The users information could not be retrieved." },
          err
        );
    });
});

server.post("/", (req, res) => {
  const userData = req.body;

  const user = new User(userData);

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
});
server.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (user === null)
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      else res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" }, err);
    });
});

module.exports = server;
