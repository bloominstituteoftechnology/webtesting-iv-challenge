/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest');

const server = require('./server'); // this is our first red, it doesn't exist

describe('server.js', () => {
  it('should return an OK status code and a JSON object fron the index route', async () => {
    // it('should return an OK status code and a JSON object fron the index route', async () => {
    const expectedStatusCode = 200;
    const expectedBody = { api: 'running' };

    // do a get request to our api (server.js) and inspect the response
    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual('application/json');

    // create the user
    let supertestResponse = await request(server).get('/123');
    // check the user exist
    supertestResponse = await request(server).delete('/123');
    supertestResponse = await request(server).get('/123');
    // check the user is not there anymore

    // using .then()
    // let response;
    // return request(server).get('/').then(res => {
    //   response = res;

    //   expect(response.status).toEqual(expectedStatusCode);
    //   expect(response.body).toEqual(expectedBody);
    //   expect(response.type).toEqual('application/json');
    // })
  });
});