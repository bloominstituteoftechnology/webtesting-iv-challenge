const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('../server');
chai.use(chaihttp);

const Book = require('../models/BookModel');

describe('Server', () => {
  describe('[GET] /books', () => {
    it('should retrieve the book titles', () => {
      chai
        .request(server)
        .get('/books')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          console.log(res.body);
          expect(res.body).includes({ message: 'Here are your books' });
        });
    });
  });
});
