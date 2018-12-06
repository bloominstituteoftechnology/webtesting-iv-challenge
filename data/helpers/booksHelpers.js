const db = require('../dbConfig.js');

module.exports = {
    getBooks
};

// return all books in the database
function getBooks() {
    return db('books');
};