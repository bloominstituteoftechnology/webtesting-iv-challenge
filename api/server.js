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
<<<<<<< HEAD
  const user = req.body;
  if (user.username) {
    const deleted = await helpers.deleteUser(user);
    res.status(200).json({ deleted });
  } else res.status(400).json({ user });
=======
  const { count } = req.body;

  if (count) {
    res.json({ count });
  } else res.status(400).json({ error: "user not deleted" });
>>>>>>> 0fc751f76f85856a16e56fc2a8e2407b4847ed78
});

module.exports = server;
