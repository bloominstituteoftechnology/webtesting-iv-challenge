const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running!" });
});

// if (process.env.NODE_ENV !== "test") {
// 	server.listen(9000);
// }

module.exports = server;
