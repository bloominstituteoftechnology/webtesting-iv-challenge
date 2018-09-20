const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('GET / returns 200 status code', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });

  it('server running', async () => {
    const expectedBody = { api: 'running' };
    const response = await request(server).get('/');
    expect(response.body).toEqual(expectedBody);
  });

  describe('POST /friends', () => {
    it('respond with 201 created', done => {
      request(server)
        .post('/friends')
        .send({ first: 'Trevor', last: 'Sucks' })
        .expect(res => {
          res.body.id = 'some Id';
        })
        .expect(201, { id: 'some Id', first: 'Trevor', last: 'Sucks' }, done);
    });

    it('responds with error if not a first and last name', done => {
      request(server)
        .post('/friends')
        .send({ first: 'Ashwin' })
        .expect('Content-Type', /json/)
        .expect(400, '"Missing first or last name or both."', done);
    });
  });

  describe('DELETE /friends/:id', () => {
    it('responds with 200 and 1 if delete successful', done => {
      request(server)
        .delete('/friends/1')
        .expect(200, '1', done);
    });

    it('responds with 400 and 0 if delete successful', done => {
      request(server)
        .delete('/friends/6')
        .expect(400, '0', done);
    });
  });
});
