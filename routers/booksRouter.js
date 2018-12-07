const express = require('express');
const bookDb = require('../data/helpers/booksHelpers.js');

const router = express.Router();

// [GET] /api/books
router.get('', (req, res) => {
    bookDb.getBooks()
        .then(books => {
            if (books.length) {
                res.status(200).json(books);
            } else {
                res.status(200).json({ successMessage: 'Currently no books in database' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving books' });
        });
});

// [GET] /api/books/:id
router.get('/:id', (req, res) => {
    bookDb.getBook(req.params.id)
        .then(book => {
            if (book.length) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ errorMessage: 'Error retrieving dish, id does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving dish' });
        });
});

// [POST] /api/books
router.post('', (req, res) => {
    const book = req.body;
    if (book.title && book.author && book.isbn) {
        bookDb.addBook(book)
            .then(id => {
                return bookDb.getBook(id.id);
            })
            .then(book => {
                res.status(201).json(book);
            })
            .catch(err => {
                if (err.errno === 19 && err.code === 'SQLITE_CONSTRAINT') {
                    res.status(500).json({ err, errorMessage: 'ISBN already in database' })
                } else {
                    res.status(500).json({ error: err, errorMessage: 'Error adding book' });
                }
            });
    } else {
        res.status(400).json({ errorMessage: 'Book information cannot be empty' })
    }
});

// [DELETE] /api/books/:id
router.delete('/:id', (req, res) => {
    bookDb.removeBook(req.params.id)
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json({ recordsDeleted: recordsDeleted, successMessage: 'Successfully deleted book' });
            } else {
                res.status(404).json({ errorMessage: 'Error deleting book, book id does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error deleting book' })
        });
});

module.exports = router;