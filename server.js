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

server.delete('/:id', (req, res) => {
  const splicedArr = dummyDB.splice(0, 1);
  console.log(splicedArr);
  res.status(201).json(splicedArr.length);
  dummyDB = [1];
})
module.exports = server;
