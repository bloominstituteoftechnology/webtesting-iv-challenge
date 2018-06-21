const express = require('express');
const mongoose = require("mongoose");
const server = express();
const book = require("./bookModels/Book");

server.use(express.json());

mongoose
  .connect("mongodb://localhost/bookdb")
  .then(mongoose => {
    console.log("connected...");
  })
  .catch(err => {
    console.log("Error connecting to database", err);
  });



server.get('/', (req, res) => {
  res.status(200).json({
    api: 'api running'
  })
});

server.delete("/", (req, res) => {
  res.status(200).send("Deleted successfully");
});

server.get("/book", (req, res) => {
  Book.find()
    .then(Book => {
      res.status(200).json(book);
    })
    .catch(err => {
      res
        .status(500)
        .json({
            errorMessage: "The books information could not be retrieved."
          },
          err
        );
    });
});

server.post("/", (req, res) => {
  const bookData = req.body;

  const book = new book(bookData);

  book
    .save()
    .then(book => {
      res.status(201).json(book);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error while saving the book to the database."
      });
    });
});

server.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      if (book === null)
        res.status(404).json({
          message: "The book with the specified ID does not exist."
        });
      else res.status(200).json(book);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: "The book could not be removed"
        }, err);
    });
})



const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

module.exports = server;