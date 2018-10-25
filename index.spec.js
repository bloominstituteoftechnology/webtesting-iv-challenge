const server = require('./api/server.js');
const request = require('supertest');

describe('server', () => {
  it('should run tests', () => {
    expect(true).toBeTruthy();
  });

  describe('GET /', () => {
    it('should return statusCode = 200', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('should return { message: "Server Running" } ', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: "Server running" });
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toBe('application/json');      
    });
  });
});