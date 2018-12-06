const express = require("express");
const server = express();

// testing api
server.get("/", (_, res) => {
  res.status(200).json({ api: "running..." });
});

module.exports = server;
