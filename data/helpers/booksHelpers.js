const db = require('../dbConfig.js');

module.exports = {
    getBook,
    getBooks,
    addBook
};

// returns all books in table
function getBooks() {
    return db('books');
};

// returns book with given id
function getBook(id) {
    return db('books').where({id: id});
}

// adds book to table and returns book
function addBook(book) {
    console.log(book);
    return db('books')
        .insert(book)
        .then(id => { return {id: id[0] }});
};