const express = require("express");
const server = express();
const User = require("./users/User");

server.use(express.json);
server.get("/", (req, res) => {
  res.status(200).json({ api: "running!" });
});

server.post("/create", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      console.log(user);
      res.status(500).json({ message: "Error creating user", err });
    });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(9000);
}

module.exports = server;
