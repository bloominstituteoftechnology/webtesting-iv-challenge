const mongoose = require("mongoose");
const request = require('supertest');
const server = require('./server'); 

describe('server.js', () => {

    // beforeAll(() => {
    //    return mongoose
    //     .connect("mongodb://localhost/testdb")
    //     .then(console.log("connected to test db"));
    // });
    
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

    const response = await request(server).post('/api/users').send({ username: "john", password: "something"});

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  });

  it('should return 200 and JSON object when deleting to api/users', async () => {
    const expectedStatusCode = 200;

    const response = await request(server).delete('/api/users');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  });

});