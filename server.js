const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(morgan("dev"));

// ROUTES

// test
server.get("/", (req, res) => {
    res.send("Nope");
});

module.exports = server;
