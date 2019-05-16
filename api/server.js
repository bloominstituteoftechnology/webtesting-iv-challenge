const express = require("express");

const puppies = require("../puppies/puppyBreeds.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "^^ up ^^" });
});

server.get("/puppies", async (req, res) => {
  const rows = await puppies.getAll();

  res.status(200).json(rows);
});

module.exports = server;
