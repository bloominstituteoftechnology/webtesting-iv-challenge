/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest');

const server = require('./server'); // this is our first red, it doesn't exist

describe('server.js', () => {
  it('should return an OK status code and a JSON object fron the index route', async () => {
    const expectedStatusCode = 200;
    const expectedBody = { api: 'running' };

    // do a get request to our api (server.js) and inspect the response
    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual('application/json');

    // check the user exist
    // supertestResponse = await request(server).delete('/123');
    // supertestResponse = await request(server).get('/123');

  });
  it.skip('Get all todos should return an OK status(200) code and a JSON object fron /api/todos', async () => {
    const expectedStatusCode = 200;
    
    // get all todos
    let response = await request(server).get('/api/todos');

    expect(response.status).toEqual(expectedStatusCode);

  });
  it.skip('Create Todo should return an OK status(201) code and a JSON object fron /api/todos', async () => {
    const expectedStatusCode = 201;
    const todo = {task: 'Testing from server.js'};

    // post a todo
    let response = await request(server).post('/api/todos').send(todo);

    expect(response.status).toEqual(expectedStatusCode);

  });
  it('Get Todo by id should return an OK status(200) code and a JSON object fron /api/todos', async () => {
    const expectedStatusCode = 200;
    const todo = {task: 'Testing server.js'};

    // get a todo by id
    let response = await request(server).get('/api/todo/5b2c44f13cbc794134f1c671');

    expect(response.status).toEqual(expectedStatusCode);

  });
});