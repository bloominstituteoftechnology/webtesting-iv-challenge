const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const db = require('./data/db.js');
const server = express();
const Book = require('./Book.js');

mongoose
    .connect(db)
    .then(() => console.log('\n ===== API connected to the database ===== \n'))
    .catch(err => console.log('\n ===== ERROR connecting to database ===== \n', err));

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running...' });
});

server.post('/books', (req, res) => {
    const newBook = req.body;
    console.log(newBook);
    Book.create(newBook)
        .then(response => res.status(201).json({ data: response }))
        .catch(err => res.status(500).json({ data: err }))
})

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    server.listen(port, () => 
        console.log('\n ===== API running on Port ${port} ===== \n')
    );
}

module.exports = server;