const request = require('supertest');
const server = require('./server');

describe('server', () => {

  it('should return ok', async () => {
    const expectedBody = {
      api: 'api running'
    };

    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(expectedBody);

  });


});