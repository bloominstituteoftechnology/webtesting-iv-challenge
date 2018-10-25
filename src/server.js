const express = require("express");
const server = express();

const knex = require("knex");

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

// spinup test endpoint
server.get("/", (req, res) => {
  return res.status(200).json({ message: "Spinup Test Working" });
});

// mvp basic endpoint to simulate the working post
server.post("/clients", (req, res) => {
  res.status(201).json({ message: "Client added" });
});

server.delete("/clients/:id", (req, res) => {
  res.status(200).json({ message: "client deleted" });
});

module.exports = server;
