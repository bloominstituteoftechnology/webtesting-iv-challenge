const request = require('supertest');

const server = require('./server.js');

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

    it('should return with a body like: { api: "alive" }', async () => {
      let response = await request(server).get('/');

      expect(response.body).toEqual({ api: 'alive' });
    });
  });

  describe('create user', () => {
    it('should return status code 200', async () => {
    
    });
  });

  describe('delete user', () => {
    it('should return status code 200', async () => {
    
    });
  });
});
