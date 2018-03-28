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
});
