const express = require("express");
const server = express();
const db = require('./data/dbConfig');
const configMiddleware = require("./middleware");
const PORT = 5675;

configMiddleware(server);

server.post('/movies', async (req, res) => {
  const newMovie = req.body;
  const result = await db("movies").insert(newMovie);
  res.status(201).json(result);
});

server.delete('/movies/:id', async (req, res) => {
   const { id } = req.params;
   const numberDeleted = await db('movies')
      .where({ id })
      .del();
   res.status(200).json(numberDeleted);
});

module.exports = server;