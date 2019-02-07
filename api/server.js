const express = require("express");
const helpers = require("../data/helpers");
const server = express();

server.use(express.json());

// GET REQUEST TO '/'
server.get("/", (req, res) => {
  res.status(200).json({ users: [{ username: "joseph" }] });
});

module.exports = server;
