const db = require('../dbConfig.js');

module.exports = {
    getBook,
    getBooks,
    addBook,
    removeBook
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

// remove book from table, return number of records deleted
function removeBook(id) {
    return db('books')
        .where('id', Number(id))
        .del();
};