const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
  it('sets the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  // open client, make a request and inspect the response
  describe('GET /', () => {
    it('should return 200 OK', () => {
      // we return the promise
      return request(server)
        .get('/')
        .expect(200);
    });

    it('using the squad (async/await)', async () => {
      // use the squad
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    it('should return JSON using done callback', done => {
      // using the done callback
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toBe('application/json'); // Content-Type
          done();
        });
    });

    it('should return { api: "up" }', () => {
      const expected = { api: 'up' };
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });
});
