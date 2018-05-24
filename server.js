const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./users/userController");

mongoose
  .connect("mongodb://localhost/testingdb")
  .then(mongo => {
    console.log("-= Connected to mongo DB =-");
  })
  .catch(err => {
    console.log("!Error, cannot connect to mongo DB!");
  });

const server = express();

server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running!" });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(5000, () => {
    console.log(`== Server is up and runing on 5000 ==`);
  });
}

module.exports = server;
