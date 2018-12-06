const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({api: "up"});
});

// const port = process.env.PORT || 3500;

module.exports = server;
