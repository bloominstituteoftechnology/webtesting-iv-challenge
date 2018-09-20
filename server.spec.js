const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('run the tests', () => {
    expect(true).toBeTruthy(); 
  }); 
});

describe('DELETE /:id', () => {
  it('should have status 204', async () => {
    const response = await request(server).delete('/2');

    expect(response.status).toEqual(204); 
  });
});


describe('POST /', () => {
  it('should have status 200', async () => {
    const response = await request(server).post('/');

    expect(response.status).toEqual(201);
  });
})


