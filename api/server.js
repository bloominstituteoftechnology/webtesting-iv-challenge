const express = require("express");
const users = require("../users/users.js");

const server = express();

server.use(express.json());

server.get("/", async(req, res) => {
   res.status(200).json({api: "running"});
});

module.exports = server;