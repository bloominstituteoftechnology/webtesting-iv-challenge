const request = require('supertest');
const server = require('./server.js');
const artists = require('./db');

describe('server.js', () => {
  describe('/artists route', () => {
    describe('GET', () => {
      it('should return a status code of 200', async () => {
        let response = await request(server).get('/artists');
        expect(response.status).toBe(200);
      });
      it('should return JSON', async () => {
        let response = await request(server).get('/artists');
        expect(response.type).toBe('application/json');
      });
      // it('should return a body of artists', async () => {
      //   let response = await request(server).get('/artists');
      //   expect(response.body).toBe('application/json');
      // });
    });
    describe('POST', () => {
      it('should add a new artist to the array', async () => {
        let response = await request(server)
          .post('/artists')
          .send({ name: 'Mitski' });
        expect(response.body).toEqual(artists);
      });
      it('should return a status of 201', async () => {
        let response = await request(server).post('/artists');
        expect(response.status).toBe(201);
      });
    });
    describe('DELETE', () => {
      it('should delete an artist from the array', async () => {
        let response = await request(server)
          .delete('/artists')
          .send({ name: 'Mitski' });
        expect(response.body).toEqual([
          {
            name: 'The Sidekicks'
          },
          {
            name: 'Radiohead'
          },
          {
            name: 'PUP'
          },
          {
            name: 'Tom Petty and the Heartbreakers'
          },
          {
            name: 'Vulfpeck'
          },
          {}
        ]);
      });
      it('should return a status of 200', async () => {
        let response = await request(server).delete('/artists');
        expect(response.status).toBe(200);
      });
    });
  });
});
