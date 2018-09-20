const req = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return an OK status code (200)', async () => {
      const res = await req(server).get('/');
      expect(res.status).toEqual(200);
    });
  });
});
