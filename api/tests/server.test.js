const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('../server');
chai.use(chaihttp);

const Book = require('../models/BookModel');

describe('Server', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/booksTest');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error');
    });
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('[GET] /books', () => {
    it('should retrieve the book titles', done => {
      chai
        .request(server)
        .get('/books')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('[POST] /books', () => {
    it('should save a new book', done => {
      const book = {
        title: 'A New Earth',
        author: 'Eckhart Tolle',
      };

      chai
        .request(server)
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

  describe('[DELETE] /books/:id', () => {
    it('should delete the correct book by id', done => {
      const book = new Book({
        title: 'Slaughterhouse Five',
        author: 'Kurt Vonnegut',
      });
      book.save((err, book) => {
        chai
          .request(server)
          .delete(`/books/${book.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('[PUT] /books/:id', () => {
    it('should update the book by id', done => {
      const book = new Book({
        title: 'Test book title',
        author: 'Test author man',
      });

      book.save((err, book) => {
        chai
          .request(server)
          .put(`/books/${book.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});
