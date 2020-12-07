const request = require('supertest');
const server = require('./server');
describe('server', () => {
  describe('GET /users', () => {
    it('should return a 200 status code', async () => {
      const res = await request(server).get('/users');
      expect(res.status).toEqual(200);
    });
    it('returned response should be type JSON', async () => {
      const res = await request(server).get('/users');
      expect(res.type).toEqual('application/json');
    });
    it('should return {users: "array of users"} in response body', async () => {
      const expected = { users: 'array of users' };
      const res = await request(server).get('/users');
      expect(res.body).toEqual(expected);
    });
  });
  describe('POST /users', () => {
    it('should return a 201 status code', async () => {
      const res = await request(server)
        .post('/users')
        .send({ user: 'name', id: '1' });
      expect(res.status).toEqual(201);
    });
    it('should return {name, id} in response body', async () => {
      const expected = { name: 'Logan', id: '1' };
      const res = await request(server)
        .post('/users')
        .send({ name: 'Logan', id: '1' });
      expect(res.body).toEqual(expected);
    });
    it('should return JSON type response', async () => {
      const res = await request(server)
        .post('/users')
        .send({ name: 'Logan', id: '1' });
      expect(res.type).toEqual('application/json');
    });
  });
  describe('DELETE /users/:id', () => {
    it('should return a 200 status code when deleting user', async () => {
      const res = await request(server)
        .delete('/users/1')
        .send({ id: '1' });
      expect(res.status).toEqual(200);
    });
    it('should return {deleted: "user id"} in response body', async () => {
      const expected = { deleted: '1' };
      const res = await request(server)
        .delete('/users/1')
        .send({ id: '1' });
      expect(res.body).toEqual(expected);
    });
    it('should return JSON type response', async () => {
      const res = await request(server)
        .delete('/users/1')
        .send({ id: '1' });
      expect(res.type).toEqual('application/json');
    });
  });
  describe('PUT /users/:id', () => {
    it('should return a 200 status code when updating user', async () => {
      const res = await request(server)
        .put('/users/1')
        .send({ name: 'Logan', id: '1' });
      expect(res.status).toEqual(200);
    });
    it('should return {name, id} in response body', async () => {
      const expected = { name: 'Logan', id: '1' };
      const res = await request(server)
        .put('/users/1')
        .send({ name: 'Logan', id: '1' });
      expect(res.body).toEqual(expected);
    });
    it('should return JSON type response', async () => {
      const res = await request(server)
        .put('/users/1')
        .send({ name: 'Logan', id: '1' });
      expect(res.type).toEqual('application/json');
    });
  });
});
