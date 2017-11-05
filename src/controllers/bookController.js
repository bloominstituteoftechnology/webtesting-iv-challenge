const mongoose = require('mongoose');

const Book = require('../models/Books');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    return res.status(500).json({message: "Something went wrong on the server."});
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    return res.json(book);
  } catch (error) {
    return res.status(404).json({error: "Book not found"});
  }
};

const addBook = async (req, res) => {
  const book = { title, author, pages, isbn, year, genre } = req.body;

  try {
    const newBook = await new Book(book).save();
    return res.json(newBook);
  } catch (error) {
    return res.status(500).json({error: "Something went wrong on the server."});
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Book.findByIdAndRemove(id);
    if(!removed) throw new Error('Not found');
    return res.json({message: "Deletion successful"});
  } catch (error) {
    return res.status(404).json({error: "Book not found"});
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body, {new: true});
    return res.json(book);
  } catch (error) {
    return res.status(404).json({error: "Book not found"});
  }
};

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook
};