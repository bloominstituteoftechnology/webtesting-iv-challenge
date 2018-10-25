const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
  describe('POST /', () => {
    it('should return status code 201(OK)', async () => {
      const name = "test";
      const response = await request(server).post(`/api/${name}`);
      expect(response.status).toBe(201);
    });
    it('should return body of "message: test"', async () => {
      const name = "test";
      const expected = { message: "test" };
      const response = await request(server).post(`/api/${name}`);
      expect(response.body).toEqual(expected);
    })
  })
});