const express = require("express");
const server = express();
server.use(express.json());

let users = [
  {
    name: "user",
    id: 1
  },
  {
    name: "user2",
    id: 2
  }
];

let userId = 3;

server.get("/", (req, res) => {
  res.status(200).json(users);
});

server.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).json({ error: "Please provide a name." });
    return;
  }
  const newUser = { name, id: userId };
  users.push(newUser);
  res.json(newUser);
  userId++;
});

server.listen(9000, () => {
  console.log("Listening on port 9000.");
});

module.exports = server;
