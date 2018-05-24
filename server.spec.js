const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('should return http status code', async () => {
    const expectedBody = ({ api: 'running' });

    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
  });
});