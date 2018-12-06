const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  describe('root route', () => {
    it('should send back a 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
});
