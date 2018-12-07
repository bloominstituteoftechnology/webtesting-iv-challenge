const express = require('express');

const booksRouter = require('../routers/booksRouter.js');

module.exports = server => {
    server.use(express.json());

    server.use('/api/books', booksRouter);
};