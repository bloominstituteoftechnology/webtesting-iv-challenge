const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('POST /resources/:id', () => {
    it('should return { message: `Resource added.` } when resource successfully added', async () => {
      const response = await request(server).post('/resources');
      expect(response.body).toEqual({ message: 'Resource added.' });
      expect(response.status).toEqual(201);
    });
  });

  describe('DELETE /resources/:id', () => {
    it('should return { message: `Resource deleted.` } when resource successfully deleted', async () => {
      const response = await request(server).delete('/resources/1');
      expect(response.body).toEqual({ message: 'Resource with id 1 deleted.' });
      expect(response.status).toEqual(200);
    });
  });
});
