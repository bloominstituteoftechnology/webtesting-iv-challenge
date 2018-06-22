const mongoose = require("mongoose");
const request = require('supertest');
const server = require('./server'); 

describe('server.js', () => {

  beforeAll(() => {
      return mongoose.connect('mongodb://localhost/testdb');
    });
    
  it('should return OK status code and a JSON object from get /', async () => {
    const expectedStatusCode = 200;
    const expectedBody = { api: 'running' };

    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual('application/json');
  });

  it('should return 201 and JSON object when posting to api/users', async () => {
    const expectedStatusCode = 201;
    const body = { username: "john", password: "something"}
    const response = await request(server).post('/api/users').send(body);

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toMatchObject({ username: "john" });
    expect(response.type).toEqual('application/json');
  });

  it('should return 404 and JSON object when deleting to api/users without a password', async () => {
    const expectedStatusCode = 404;

    const response = await request(server).delete('/api/users').send({ bullshit: 'bullshit' });

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  });

  it('should return 200 and JSON object when deleting to api/users with a password', async () => {
    const expectedStatusCode = 200;

    const response = await request(server).delete('/api/users').send({ password: 'password' });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toMatchObject({ "ok": 1 });
    expect(response.type).toEqual('application/json');
  });

  it('should return 404 and JSON error message if no username and password are provided to post', async () => {
    const expectedStatusCode = 404;

    const response = await request(server).post('/api/users').send({ bullshit: "some bullshit" });

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

});