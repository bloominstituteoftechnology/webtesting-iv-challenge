const express = require("express");
const server = express();
const User = require("./users/User");
const mongoose = require("mongoose");
const url = require("url");

server.use(express.json());

mongoose
  .connect("mongodb://localhost/db")
  .then(mongo => {
    console.log("connected to db");
  })
  .catch(err => {
    console.log("error connecting to the db", err);
  });

server.get("/", (req, res) => {
  res.status(200).json({ api: "running!" });
});

server.get("/create", (req, res) => {
  res.status(200).json({ message: "yay! you hit /create !" });
});
server.post("/create", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating user", err });
    });
});

server.get("/reroute", (req, res) => {
  res.redirect(
    url.format({
      pathname: "https://google.com"
    })
  );
});

if (process.env.NODE_ENV !== "test") {
  server.listen(9000);
}

module.exports = server;
