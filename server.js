const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/book_collection",
  {},
  err => {
    if (err) console.log("Database connection failed");
    console.log("Successfully connected to MongoDB");
  }
);

const booksRouter = require("./books/booksRouter");
const server = express();

server.use(express.json());
server.use("/api/books", booksRouter);

server.get("/", (req, res) => res.status(200).json({ api: "running" }));

server.listen(5000, () => console.log(`API running on http://localhost:5000`));

module.exports = server;
