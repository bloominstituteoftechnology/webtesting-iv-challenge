const request = require('supertest');
const server = require('./api/server');

describe('server', () => {
  describe('GET /', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });




});