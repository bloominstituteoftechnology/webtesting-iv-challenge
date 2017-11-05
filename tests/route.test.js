const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;

const { server } = require('../src/server');
const Book = require('../src/models/Books');

chai.use(chaiHTTP);

mongoose.connect('mongodb://localhost/test', {useMongoClient: true});
mongoose.Promise = global.Promise;

describe('/books', () => {
  beforeEach(async () => {
    try {
      await Book.remove();
    } catch (error) {
      console.log(error);
    }
  });

  describe('GET /books', () => {
    it('should get a list of all books', async () => {
      const res = await chai.request(server).get('/books');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('Array');
      expect(res.body.length).to.equal(0);
    });
  });

  describe('POST /books', () => {
    it('should add a book', async () => {
      const book = {
        title: "The Cat in the Hat",
        author: "Dr. Seuss",
        year: 1957,
        pages: 61,
        isbn: "978-0-7172-6059-1",
        genre: ["Childrens"]
      };
      const res = await chai
                  .request(server)
                  .post('/books')
                  .send(book);
      
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal(book.title);
    });
  });

  describe('GET /books/:id', () => {
    it('should get a book with the specified ID', async () => {
      const book = {
        title: "The Cat in the Hat",
        author: "Dr. Seuss",
        year: 1957,
        pages: 61,
        isbn: "978-0-7172-6059-1",
        genre: ["Childrens"]
      };

      const addedBook = await chai
                        .request(server)
                        .post('/books')
                        .send(book);
      
      const res = await chai
                  .request(server)
                  .get(`/books/${addedBook.body._id}`);

      expect(res.status).to.equal(200);
      expect(res.body.author).to.equal(book.author);
    });

    it('should report an error if the ID does not exist', async () => {
      const res = await chai
                  .request(server)
                  .get(`/books/123`);
      
      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal('Book not found');
    });
  });

  describe('PUT /books/:id', () => {
    it('should update an entry with the specified ID', async () => {
      const book = {
        title: "The Cat in the Hat",
        author: "Dr. Seuss",
        year: 1957,
        pages: 61,
        isbn: "978-0-7172-6059-1",
        genre: ["Childrens"]
      };

      const update = {author: "Theodor Giesel"}

      const addedBook = await chai
                        .request(server)
                        .post('/books')
                        .send(book);
      const res = await chai
                  .request(server)
                  .put(`/books/${addedBook.body._id}`)
                  .send(update);
      
      expect(res.status).to.equal(200);
      expect(res.body.author).to.equal(update.author);
    });

    it('should report an error given an incorrect ID', async () => {
      const res = await chai
                  .request(server)
                  .put(`/books/123`)
                  .send({title: "Hello"});
      
      expect(res.status).to.equal(404);
      expect(res.body).to.equal({"error": "Book not found"});
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book by the specified ID', async () => {
      const book = {
        title: "The Cat in the Hat",
        author: "Dr. Seuss",
        year: 1957,
        pages: 61,
        isbn: "978-0-7172-6059-1",
        genre: ["Childrens"]
      };

      const addedBook = await chai
                        .request(server)
                        .post('/books')
                        .send(book);
                
      const res = await chai.request(server).del(`/books/${addedBook.body._id}`);

      expect(res.status).to.equal(200);
      
      const books = await Book.find();
      expect(books.length).to.equal(0);
    });

    it('should report an error given an incorrect ID', async () => {
      const res = await chai
                        .request(server)
                        .del('/books/123');
      
      expect(res.status).to.equal(404);
      expect(res.body).to.equal({"error": "Book not found"});
    });
  });
});