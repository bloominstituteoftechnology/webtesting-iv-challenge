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

describe('POST /todos', () => {
  it('returns a 201', done => {
    return request(app)
      .post('/todos')
      .send({ text: 'Learn testing' })
      .expect(201, done);
  });

  it('creates a new todo object and returns it with id', done => {
    return request(app)
      .post('/todos')
      .send({ text: 'Learn testing' })
      .then(response => {
        expect(response.body.hasOwnProperty('id')).toBe(true);
        expect(response.body.text).toBe('Learn testing');
        expect(response.body.complete).toBe(false);
        done(null);
      })
      .catch(done);
  });

  it('adds the new object to the list of todos', done => {
    let data = null;
    return request(app)
      .post('/todos')
      .send({ text: 'Learn testing' })
      .then(response => {
        data = response.body;
        return request(app).get('/todos');
      })
      .then(response => {
        expect(response.body).toContainEqual(data);
        return done(null);
      })
      .catch(done);
  });
});
