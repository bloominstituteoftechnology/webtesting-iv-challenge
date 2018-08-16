const request = require('supertest');
const server = require('../server');

describe('server', () => {
  describe('root endpoint (/)', () => {
    it('should ask if the server is a teapot', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(418);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });
  });
})