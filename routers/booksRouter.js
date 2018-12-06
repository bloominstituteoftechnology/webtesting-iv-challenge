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
                res.status(200).json({ successMessage: 'Currently no books in database'})
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving books' });
        });
});

module.exports = router;