const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  it('should return OK status code and a JSON object from the index route', async () => {
    const expected = {
      status: 200,
      body: {
        api: 'running'
      },
      type: 'application/json'
    };
    const response = await request(server).get('/');
    expect(response.status).toBe(expected.status);
    expect(response.type).toBe(expected.type);
    expect(response.body).toEqual(expected.body);
  });
});