const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  it('should return JSON', async () => {
    let response = await request(server).get('/');
    expect(response.type).toBe('application/json');
  });

  it('return with a body: { api: "up" }', async () => {
    const expected = { api: 'up' };
    let response = await request(server).get('/');
    expect(response.body).toEqual(expected);
  });

  describe('add character endpoint', () => {
    it('should return status code 201', async () => {
      let response = await request(server).post('/characters');
      expect(response.status).toBe(201);
    });

    it('should notify character added', async () => {
      let response = await request(server).post('/characters');
      expect(response.body).toEqual({ message: 'character added' });
    });
  });

  describe('delete character endpoint', () => {
    it('should return status 200', async () => {
      let response = await request(server).delete('/characters/1');
      expect(response.status).toBe(200);
    });

    it('should notify character deleted', async () => {
      let response = await request(server).delete('/characters/1');
      expect(response.body).toEqual({ message: 'character deleted' });
    });
  });
});
