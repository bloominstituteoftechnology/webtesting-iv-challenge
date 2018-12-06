const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('get / endpoint', () => {
    it('should return the correct status code', async () => {
      const expected = 200;

      const response = await request(server).get('/');

      expect(response.status).toEqual(expected);
    });

    it('should return the correct JSON', async () => {
      const expected = { message: 'API running' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expected);
    });

    it('should return a JSON object', async () => {
      const expected = 'application/json';

      const response = await request(server).get('/');

      expect(response.type).toEqual(expected);
    });
  });
  describe('get /api/users endpoint', () => {
    it('should return an array of users', async () => {
      const expected = [{ name: 'Brandon' }];

      const response = await request(server).get('/api/users');

      expect(response.body).toEqual(expected);
    });
  });
  describe('post /api/users endpoint', () => {
    it('should add a user', async () => {
      const expected = [{ name: 'Brandon' }, { name: 'Tommy' }];

      const response = await request(server)
        .post('/api/users')
        .send({ name: 'Tommy' });

      expect(response.body).toEqual(expected);
    });
    it('should return the correct status code', async () => {
      const expected = 201;

      const response = await request(server)
        .post('/api/users')
        .send({ name: 'Anthony' });

      expect(response.status).toEqual(expected);
    });
  });
  describe('delete /api/user/:name endpoint', () => {
    it('should delete the user', async () => {
      const expected = [{ name: 'Tommy' }, { name: 'Anthony' }];

      const response = await request(server).delete('/api/users/Brandon');

      expect(response.body).toEqual(expected);
    });
    it('should return the correct status code', async () => {
      const expected = 200;

      const response = await request(server).delete('/api/users/Brandon');

      expect(response.status).toEqual(expected);
    });
  });
});
