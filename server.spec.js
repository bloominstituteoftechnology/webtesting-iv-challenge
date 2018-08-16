const request = require('supertest');
const server = require('./server.js');

// always use async/await when doing server tests
describe('server.js', () => {
  it('should return status code 200 OK', async () => {
    const expected = 200;
    const response = await request(server).get('/');
    expect(response.status).toEqual(expected);
  });

  it('should return status code 404 if not hitting a resource', async () => {
    const expected = 404;
    const URL = '/hollla';
    const response = await request(server).get(URL);
    expect(response.status).toEqual(expected);
  });

  it('should return URL attempted if a 404', async () => {
    const expected = 404;
    const URL = '/hollla';
    const response = await request(server).get(URL);
    // console.log('BODY', response.error.text);
    expect(response.error.text).toContain(URL);
  });

  it('should return JSON', async () => {
    const response = await request(server).get('/');
    expect(response.type).toEqual('application/json');
  });

  describe('books', () => {
    it('should return a list of books', async () => {
      const response = await request(server).get('/books');
      const bookArr = response.body.books;
      expect(bookArr.length).toBeGreaterThan(0);
    });

    it('should add a book', async () => {
      const book = 'The Lord of the Flies';
      const response = await request(server)
        .post('/books')
        .send({ book: book });
      const bookArr = response.body.books;
      let valid = false;
      for (let i = 0; i < bookArr.length; i++) {
        if (bookArr[i] == book) valid = true;
      }
      expect(valid).toBe(true);
    });

    it('should delete a book', async () => {
      const book = 'The Lord of the Flies';
      await request(server)
        .post('/books')
        .send({ book: book });
      const response = await request(server)
        .delete('/books')
        .send({ book: book });
      const bookArr = response.body.books;
      console.log('BOOKARR', bookArr);
      let valid = false;
      for (let i = 0; i < bookArr.length; i++) {
        if (bookArr[i] == book) valid = true;
      }
      expect(valid).toBe(true);
    });
  });
});
