const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const morgan = require('morgan');

// server.use(morgan('combined'));
server.use(express.json());

const Book = require('./models/BookModel');

//===============================
//          ROUTES
//===============================

server.get('/', function(req, res) {
  res.status(200).json({ message: 'Works...' });
});

server.get('/books', (req, res) => {
  Book.find({})
    .then(books => {
      res.status(200).json(books);
    })
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

server.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndRemove(id)
    .then(book => {
    res.status(200).json(book);
  });
});

server.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const bookInfo = req.body;

  Book.findByIdAndUpdate(id, bookInfo, {new: true})
    .then(book => {
      if (!book) {
        res.status(404).send({ message: 'No book found!'});
      } else {
        res.status(200).send(book);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Error!' });
    });

})

module.exports = server;
