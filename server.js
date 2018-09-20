const express = require("express");

const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/greet/:name", (req, res) => {
  const name = req.params.name;
  const last = req.body.last;
  res.status(200).json({ Hello: `${name} ${last}` });
});

//TESTING PROJECT CODE

server.get("/users", (req, res) => {
  db("users")
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({
            message: "The resource does not exist or is currently empty."
          });
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

module.exports = server;
