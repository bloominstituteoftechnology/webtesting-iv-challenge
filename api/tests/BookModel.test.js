const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Book = require('../models/BookModel');

describe('Books', () => {
  describe('getBookTitle', () => {
    it('should get the name of the book', () => {
      const book = new Book({
        title: 'Slaughterhouse Five',
        author: 'Kurt Vonnegut',
      });
      expect(book.getTitle()).to.equal('Slaughterhouse Five');
    });
  });
  describe('getAllTitles', () => {
    it('should get all the titles of the books', () => {
      sinon.stub(Book, 'find');
      Book.find.yields(null, [
        { title: 'Slaughterhouse Five', author: 'Kurt Vonnegut' },
        { title: 'A New Earth', author: 'Eckhart Tolle' },
      ]);
      Book.getAllTitles(books => {
        expect(books.length).to.equal(2);
        expect(books[0].title).to.equal('Slaughterhouse Five');
        Book.find.restore();
      });
    });
  });
});
