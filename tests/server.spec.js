const request = require('supertest');
const server = require('../api/server.js');

describe('server', () => {
  describe('GET /', () => {
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });
  });
  it('can run tests', () => {
    expect(true).toBeTruthy();
  });
  it('can run more tests', () => {
    expect(true).toBeTruthy();
  });
});