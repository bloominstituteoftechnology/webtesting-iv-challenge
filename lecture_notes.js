
/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest'); // calling it "request" is a common practice

const server = require('./app.js'); // this is our first red, file doesn't exist yet

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('index route', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);

    });
  });

  it('should return a JSON object fron the index route', async () => {
    const expectedBody = { api: 'running' };

    const response = await request(server).get('/');

    expect(response.body).toEqual(expectedBody);
  });

  it('should return a JSON object fron the index route', async () => {
    const response = await request(server).get('/greet/amon');
    const res = await request(server)
      .post('/greet/amon')
      .send({ last: 'kimsey' });

    expect(res.body).toEqual({ hello: 'amon kimsey' });
  });
});
