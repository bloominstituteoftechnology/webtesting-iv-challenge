const express = require("express");
const server = express();

const knex = require("knex");
const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

server.get("/", (req, res) => {
  res.status(200).end();
});

server.get("/classes", (req, res) => {});

module.exports = server;
