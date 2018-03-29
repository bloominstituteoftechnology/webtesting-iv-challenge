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

  //==========================
  //  BEFORE and AFTER HOOKS
  //==========================

  let bookID;

  beforeEach(done => {
    new Book({
      title: 'A New Earth',
      author: 'Eckhart Tolle',
    }).save((err, book) => {
      if (err) {
        console.error(err);
        return done();
      }
      bookID = book.id;
      done();
    });
  });

  afterEach(done => {
    Book.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  //==========================
  //       ROUTE TESTS
  //==========================

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
        title: 'A New Book',
        author: 'Eckhart llksdaTolle',
      };

      chai
        .request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          console.log();
          if (err) return console.error(err);
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal('A New Book');
          done();
        });
    });
  });

  describe('[DELETE] /books/:id', () => {
    it('should remove the book properly', done => {
      chai
        .request(server)
        .delete(`/books/${bookID}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.body.title).to.equal('A New Earth')
          expect(res.status).to.equal(200);
          Book.findById(bookID, (err, deletedBook) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(deletedBook).to.equal(null);
            done();
          });
        });
    });
  });

  describe('[PUT] /books/:id', () => {
    const newBook = {
      title: 'New book title',
    };
    it('should update the book by id', done => {
      chai
        .request(server)
        .put(`/books/${bookID}`, newBook)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return new book title', done => {
      chai
        .request(server)
        .put(`/books/${bookID}`)
        .send(newBook)
        .end((err, res) => {
          expect(res.body.title).to.equal('New book title');
          done();
        });
    });
  });
});
