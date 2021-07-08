
const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {

  describe('index route', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);

    });

    it('should return a JSON object fron the index route', async () => {
      const expectedBody = { api: 'running' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object fron the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST /cars', () => {
    it('respond with car make and model', async () => {
        const make = "Mazda";
        const model = "Mazda3";

      request(server)
        .post('/cars')
        .send({ make: `${make}`, model: `${model}` })
        .expect(201, {make: `${make}`, model: `${model}`});
    });

  });

  describe('DELETE /cars/:id', () => {
    it('responds with message and car id', async () => {
        const id = 2;
      request(server)
        .delete(`/cars/:${id}`)
        .expect(201, {message: `Car with ID: ${id} has been removed`});
    });

  });
});