const express = require("express");

const server = express();

server.use(express.json());

// Sanity check endpoint
server.get("/", (req, res) => {
    res.status(200).json({ api: "Up and running" });
});

// const port = process.env.PORT || 9000;

module.exports = server;