const req = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return an OK status code (200)', async () => {
      const res = await req(server).get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/forms', () => {
    it('should return a Created status code (201)', async () => {
      const res = await req(server).post('/api/forms');
      expect(res.status).toBe(201);
    });

    it('should return id of newly created form', async () => {
      const res = await req(server).post('/api/forms');
      expect(typeof res.body).toBe('number');
    });
  });

  describe('DELETE /api/forms/:id', () => {
    it('should return an Accepted status code (202)', async () => {
      const res = await req(server).delete('/api/forms/1');
      expect(res.status).toBe(202);
    });

    it('should delete specified form', async () => {
      const res = await req(server).delete('/api/forms/2');
      expect(res.body).toBe(1); // records deleted
    });

    it('should return a Not Found status code (404) if id not found', async () => {
      const res = await req(server).delete('/api/forms/-dos!');
      expect(req.status).toBe(404);
    });
  });
});
