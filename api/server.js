const express = require("express");
const server = express();
server.use(express.json());

let mockDB = [{ name: "Samwise" }];

// sanity check
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/hobbits", (req, res) => {
  res.status(200).json(mockDB);
});

server.post("/hobbits", (req, res) => {
  const hobbit = req.body;
  hobbit !== {} ? (mockDB = [...mockDB, hobbit]) : null;
  res.status(201).json(mockDB.length);
});

server.delete("/hobbits", (req, res) => {
  const hobbitName = req.body.name;
  mockDB = mockDB.filter(hobbit => hobbit.name !== hobbitName);
  res.status(200).json(mockDB);
});

const port = process.env.PORT || 7000;

module.exports = server;
