const express = require("express");
const studentRouter = require("./routes/studentRoutes.js");
const server = express();

server.use(express.json());

//routes
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.use("/api/students", studentRouter);

module.exports = server;
