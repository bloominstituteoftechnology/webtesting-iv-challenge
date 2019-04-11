const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require("./middleware/restricted");

const server = express();

//Middleware
const middleware = [express.json(), helmet(), cors()];
server.use(middleware);

//Routes Middleware

server.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Welcome, please refer to the GitHub docs to get started."
    });
});

module.exports = server;
