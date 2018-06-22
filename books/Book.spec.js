const mongoose = require('mongoose');

const Book = require('./Book');

describe('book model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/server-testing');
    });

    afterEach(() => {
        return Book.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('Should create new book title and author.', async () => {
        const prideAndPrejudice = { title: 'prideAndPrejudice', author: 'austen' };

        const savedBook = await Book.create(prideAndPrejudice);
    
        expect(savedBook.author).toEqual(prideAndPrejudice.author);
        expect(savedBook.author).toEqual('austen');
    });
});