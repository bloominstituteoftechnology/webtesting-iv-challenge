const codes = require("./statusCodes");

const express = require("express");

const server = express();

server.use(express.json());
const db = require("./data/dbConfig");

server.get("/", (req, res) => {
  db("items").then(response => {
    res.status(200).json(response);
  });
});

server.post("/", (req, res) => {
    // db("items")
    // .insert(res.body)
    // .then(response => {
    //     res.status(codes.CREATED).json(response);
    // });
  res.status(codes.CREATED).json(req.body);
});

server.delete("/:id", (req, res) => {
    const { id } = req.params;
    // db("items")
    // .where('id', id)
    // .then(response => {
    //     res.status(codes.OK).json()
    // });
});
module.exports = server;
