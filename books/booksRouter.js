const express = require("express");
const Book = require("./bookModel");
const router = express.Router();

router.route("/").get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ err: err.message }));
});

router.route("/").post((req, res) => {
  const { author, genre, pages } = req.body;
  if (!author || !genre || !pages) {
    res.status(400).json({
      error: "Please provide an author, genre, and page count for your book."
    });
  } else {
    Book.create({ author, genre, pages })
      .then(book => res.status(201).json(book))
      .catch(err => res.status(500).json({ error: err.message }));
  }
});

module.exports = router;
