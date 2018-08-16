const request = require('supertest');
const server = require('../server');

describe('server', () => {
  describe('ROOT endpoint (/)', () => {
    it('should ask if the server is a teapot', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(418);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST endpoint (/)', () => {
    it('should reassure the client that it is indeed a teapot', async () => {
      const response = await request(server).post('/').send({ type: 'chamomile' });
      expect(response.status).toEqual(418);
    })

    it('should return drinkable tea when tea type is provided in the body', async () => {
      const expected = { tea: 'green tea is ready' };
      const response = await request(server).post('/').send({ type: 'green' });
      expect(response.body).toEqual(expected);
    });
  });

  describe('DELETE endpoint (/:tea)', () => {
    it('should continue to be a teapot', async () => {
      const response = await request(server).delete('/chamomile');
      expect(response.status).toEqual(418);
    })

    it('should drink the tea requested provided in the parameters', async () => {
      const expected = { tea: 'the green tea was delicious' };
      const response = await request(server).delete('/green');
      expect(response.body).toEqual(expected);
    });
  });
})