const request = require('supertest');
const app = require('./server');

describe('GET /todos', () => {
  it('responds with status 200 and content type is json', () => {
    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('responds with an array of todos', done => {
    return request(app)
      .get('/todos')
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);
        done(null);
      })
      .catch(done);
  });
});
