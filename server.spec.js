const request = require('supertest');

const server = require('./server');

describe('server here', () => {
  it('Should return a running server and return a JSON object', () => {
    const expectedBody = { api: '===API is running === '};
    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual('expectedBody');
  })
})