const express = require("express");
const server = express();

const knex = require("knex");
const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

server.use(express.json());

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ api: "running" })
    .end();
});

server.get("/classes", (req, res) => {
  db("classes").then(response => {
    res
      .status(200)
      .json(response)
      .end();
  });
});

server.post("/classes", (req, res) => {
  db("classes")
    .insert(req.body)
    .then(response => {
      res
        .status(201)
        .json(response)
        .end();
    });
});

server.delete("/classes/:id", (req, res) => {
  db("classes")
    .where({ id: req.params.id })
    .del()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end();
    });
});

server.put("/classes/:id", (req, res) => {
  db("classes")
    .where({ id: req.params.id })
    .update(req.body)
    .then(response => {
      res
        .status(200)
        .json(response)
        .end();
    });
});

module.exports = server;
