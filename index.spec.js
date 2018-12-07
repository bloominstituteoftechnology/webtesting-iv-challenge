// DEPENDENCIES
// ==============================================
const req = require('supertest');

const app = require('./index.js');

describe('index.js', () => {
  describe('/ route', () => {
    it('should return a status code of 200', async () => {
      let res = await req(app).get('/');
      expect(res.status).toBe(200);
    });

    it('should return in JSON syntax', async () => {
      let res = await req(app).get('/');
      expect(res.type).toBe('application/json');
    });

    it('should return with a body like: { you: "up?" }', async () => {
      let res = await req(app).get('/');
      expect(res.body).toEqual({ you: 'up?' });
    });
  });
});
