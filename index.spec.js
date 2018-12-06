const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  describe('/route', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });

  it('should return JSON', async () => {
    let response = await request(server).get('/');
    expect(response.type).toBe('application/json');
  });

  it('return with a body: { api: "up" }', async () => {
    const expected = { api: 'up' };
    let response = await request(server).get('/');
    expect(response.body).toEqual(expected);
  });
});
