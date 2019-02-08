const express = require("express");
const helpers = require("../data/helpers");
const server = express();

server.use(express.json());

// GET REQUEST TO '/'
server.get("/", (req, res) => {
  res.status(200).json({ users: [{ username: "joseph" }] });
});

// POST REQUEST TO '/'
server.post("/", async (req, res) => {
  const body = req.body;
  if (body.username) {
    const user = await helpers.insert(body);
    res.status(201).json(user);
  } else {
    res.status(400).json({ error: "no user created" });
  }
});

server.delete("/", async (req, res) => {
  const { count } = req.body;

  if (count) {
    res.json({ count });
  } else res.status(400).json({ error: "user not deleted" });
});

module.exports = server;
