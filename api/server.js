const express = require("express");
const server = express();

server.use(express.json());

let db = [{ _id: 1, name: "brad" }, { _id: 2, name: "brad2" }];
let _id = 3;

// testing api
server.get("/", (_, res) => {
  res.status(200).json({ api: "running..." });
});

server.get("/users", (_, res) => {
  res.status(200).json(db);
});

server.post("/create", (req, res) => {
  const { name } = req.body;
  db.push({ _id, name });
  res.status(201).json({ message: `user ${name} created` });
  _id = _id + 1;
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db = db.filter(user => user._id !== Number(id));
  res.status(200).json({ message: `user deleted` });
});

module.exports = server;