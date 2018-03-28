const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

server.use(morgan('combined'));
server.use(express.json());

const Book = require('./models/BookModel');

//===============================
//          ROUTES
//===============================

server.get('/', function(req, res) {
  res.status(200).json({ message: 'Works...' });
});

server.get('/books', (req, res) => {
  res
    .status(200)
    .json({ message: 'Here are your books', books: ['Slaughterhouse Five'] });
});

server.post('/books', (req, res) => {
  const bookInfo = req.body;
  if (!bookInfo.title || !bookInfo.author) {
    res.status(400).json({ message: 'Must provide a title and author!' });
  } else {
    const book = new Book(bookInfo);
    book
      .save()
      .then(savedBook => {
        res.status(201).json(savedBook);
      })
      .catch(err => {
        res.status(500).json({ message: 'there was an error!' });
      });
  }
});

// server.post('/books', (req, res) => {
//   const book = new Book(req.body);
//   book.save((err, savedBook) => {
//     if (err) return res.send(err);
//     res.send(savedBook);
//   });
// });

server.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndRemove(id).then(book => {
    res.status(200).json(book);
  });
});

module.exports = server;
