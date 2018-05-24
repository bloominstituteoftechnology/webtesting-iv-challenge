const request = require('supertest');

const server = require('./server');

describe('server', () => {
  it('should return Ok and a json object from the index route', async () => {
    const expectedBody = { api: 'running!' };

    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(expectedBody);
  });
  it('should be able to create and delete a user', async () => {
    const userBody = { username: 'foo', password: 'bar' };

    const response = await request(server).post('/users').send(userBody);

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body.username).toEqual('foo');

    const response2 = await request(server).delete(`/users/${response.body._id}`);
    
    expect(response2.status).toEqual(200);
    expect(response2.type).toEqual('application/json');
    expect(response2.body.username).toEqual('foo');
  });
});