const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "working" });
});

server.listen("9000", () => {
  console.log("\n server running on port 9000\n");
});
