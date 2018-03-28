const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('../server');
chai.use(chaihttp);

const Book = require('../models/BookModel');

describe('Server', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/books');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error');
    });
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('[GET] /books', () => {
    it('should retrieve the book titles', (done) => {
      chai
        .request(server)
        .get('/books')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          console.log(res.body);
          expect(res.body).includes({ message: 'Here are your books' });
          done();
        });
    });
  });

  describe('[POST] /books', () => {
    it('should save a new book', (done) => {
      const book = {
        title: 'A New Earth',
        author: 'Eckhart Tolle'
      }

      chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        if (err) return console.error(err);
        expect(res.status).to.equal(201);
        expect(res.body.title).to.equal('A New Earth');
        done();
      });
    });
  });

});
