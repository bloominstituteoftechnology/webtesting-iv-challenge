const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-mongoose');

const Book = require('../src/models/Books');

describe("Models", () => {
  describe("#findByAuthor()", () => {
    it('should return all books by the given author', async () => {
      const BookMock = sinon.mock(Book);
      BookMock
        .expects('find')
        .withArgs({author: 'AUTHOR'})
        .chain('limit', 15)
        .chain('sort', '-title')
        .resolves('RESULT');

      const result = await Book.findByAuthor('AUTHOR');
      BookMock.restore();
      expect(result).to.equal('RESULT');
    });
  });

  describe("#getAuthorName()", () => {
    it('Should get the author name', () => {
      const bookMock = sinon.mock(new Book({title: 'Neuromancer', author: 'William Gibson'}));
      const book = bookMock.object;

      expect(book.getAuthor()).to.equal('William Gibson');
    });
  });
});