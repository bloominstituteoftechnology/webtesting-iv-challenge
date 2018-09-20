const express = require("express");
const server = express();

const knex = require("knex");
const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ api: "running" })
    .end();
});

server.get("/classes", (req, res) => {
  db("classes").then(response => {
    console.log(response);
    res
      .status(200)
      .json(response)
      .end();
  });
});

module.exports = server;
