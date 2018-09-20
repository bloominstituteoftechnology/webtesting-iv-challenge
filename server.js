const express = require('express');
const server = express();

server.use(express.json());

let dummyDB = [1]

server.get('/', (req, res) => {
  res.status(200).json({ api: "running"});
});

server.post('/', (req, res) => {
  const pupper = req.body.name;
  dummyDB.push(pupper);
  const dummyID = dummyDB.length;
  res.status(201).json(dummyID);
  dummyDB = [1];
});

module.exports = server;
