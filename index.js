const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Server running."
  });
});

server.post("/users", (req, res) => {
  const name = req.body.name;
  res.status(201).json({ user: name });
});

server.delete("/users", (req, res) => {
  const name = req.body.name;
  res.status(200).json(true);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});

module.exports = server;
