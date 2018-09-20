const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should respond with status of 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
});
