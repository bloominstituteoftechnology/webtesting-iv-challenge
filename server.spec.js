const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('GET / returns 200 status code', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });

  it('server running', async () => {
    const expectedBody = { api: 'running' };
    const response = await request(server).get('/');
    expect(response.body).toEqual(expectedBody);
  });

  // describe('POST /friends', () => {
  //   let data = {
  //     first: 'Trevor',
  //     last: 'Sucks',
  //   };

  //   it('respond with 201 created', async () => {
  //     const response = await request(server)
  //       .post('/friends')
  //       .send(data);
  //     expect(response.body).toEqual(data);
  //   });
  // });
});
