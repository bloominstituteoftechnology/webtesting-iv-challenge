const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  describe('GET /', () => {
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });

    it('should return { message: "server up" }', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: 'server up' });
    });
  });
  describe('POST /api/:random', () => {
    it('should return status code 201', async () => {
      const random = 'random';
      const response = await request(server).post(`/api/${random}`);
      expect(response.status).toBe(201);
    });
    it('should post object', async () => {
      const random = 'random';
      const expected = { abc: 'random' };

      const response = await request(server).post(`/api/${random}`);

      expect(response.body).toEqual(expected);
    });
  });

  describe('DELETE /api/:random', () => {
    it('should return status code 200', async () => {
      const random = 'random';
      const response = await request(server).delete(`/api/${random}`);
      expect(response.status).toBe(200);
    });
    it('should return delete successful message', async () => {
      const random = 'random';
      const expected = { message: 'Delete successful' };
      const response = await request(server).delete(`/api/${random}`);

      expect(response.body).toEqual(expected);
    });
  });
});
