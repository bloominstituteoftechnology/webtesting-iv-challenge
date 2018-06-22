const router = require('express').Router();
const Book = require('./Book.js');

router
    .route('/books')
    .post((req, res) => {
        const newBooks = req.body;
        console.log(res)
        Book.create(newBooks)
            .then(response => res.status(201).json({ data: response }))
            .catch(err => res.status(500).json({ data: err }))
    })

module.exports = router;