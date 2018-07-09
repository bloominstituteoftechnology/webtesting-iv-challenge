const express = require("express");

const mongoose = require("mongoose");

const server = express();

server.use(express.json());

mongoose
  .connect("mongodb://localhost/server-testing")
  .then(console.log("successfully connected to Server-Testing DB"))
  .catch(err => console.log(err));

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ api: "running" })
    .end();
});

module.exports = server;
