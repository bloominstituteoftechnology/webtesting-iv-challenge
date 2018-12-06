const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/');

      expect(response.status).toBe(200);
    });
    it('should return JSON', async () => {
      let response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });
    it('should return with a body like: { api: "up" }', async () => {
      let response = await request(server).get('/');

      expect(response.body).toEqual({ api: 'up' });
    });
  });
  describe('/api/users route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/api/users');

      expect(response.status).toBe(200);
    });
    it('should return JSON', async () => {
      let response = await request(server).get('/api/users');

      expect(response.type).toBe('application/json');
    });
    it('should add user', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          name: 'Darla'
        });
      expect(response.body).toEqual([1]);
    });
  });
  describe(' /api/users/:id', () => {
    it('should delete user', async () => {
      const response = await request(server).del('/api/users/44');
      expect(response.body).toEqual({});
    });
  });
});