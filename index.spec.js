const request = require('supertest');

const server = require('./api/server');

describe('server.js', () => {
  describe('POST /bands endpoint', () => {
    it('should return the band I like and how good they are', async () => {
      let response = await request(server)
        .post('/bands')
        .send({ name: 'Radiohead', quality: 'good' });

      expect(response.body).toEqual({ wow: 'Radiohead is a good band!' });

      response = await request(server)
        .post('/bands')
        .send({ name: 'Bon Iver', quality: 'good' });

      expect(response.body).toEqual({ wow: 'Bon Iver is a good band!' });
    });

    it('should return status code 200', async () => {
      let response = await request(server)
        .post('/bands')
        .send({ name: 'Hats', quality: 'good' });
      expect(response.status).toBe(200);
    });
  });
  describe('DELETE /bands/:name endpoint', () => {
    it('should return status code 200', async () => {
      let response = await request(server).delete('/bands/Radiohead');

      expect(response.status.toBe(200));
    });
    it('should return the band that was deleted', async () => {
      let response = await request(server).delete('/bands/Hats');

      expect(response.body).toBe(1);
    });
  });
});
