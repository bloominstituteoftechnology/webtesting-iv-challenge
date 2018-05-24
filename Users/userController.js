const express = require("express");

const User = require("./User");

const router = express.router();

router.get("/", (req, res) => {
  let query = User.find();

  query
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/register", (req, res) => {
  const userInput = req.body;
  const user = new User(userInput);

  user
    .save()
    .then(newUser => {
      res.status(201).json(newCategory);
    })
    .catch(err => {
      if (user.username === undefined) {
        res.status(400).json({
          errorMessage: "please provide name first."
        });
      } else {
        res.status(500).json("something went wrong while saving user.");
      }
    });
});
