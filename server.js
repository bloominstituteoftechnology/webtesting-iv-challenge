const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const port = 3000;

const server = express();
server.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
server.use(morgan("combined", { stream: accessLogStream }));

server.get("/", (req, res) => {
  res.send("Nothing to see here keep it moving");
});

server.listen(port, () => {
  console.log(`server is live on port ${port}`);
});
