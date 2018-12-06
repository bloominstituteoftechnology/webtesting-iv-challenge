const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  //
  describe('root route', () => {
    it('should send back a 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('post route', () => {
    it('should submit an album with the keys "name" and "title"', async () => {
      let response = await request(server)
        .post('/submit')
        .send({ name: 'Jon Bap', title: 'What Next' });
      expect(response.body).toEqual({ submitted: 'Jon Bap - What Next' });
    });

    it('should return a HTTP code of 202', () => {
      async () => {
        let response = await request(server)
          .post('/submit')
          .send({ name: 'No Bap', title: 'What Next' });
        expect(response.status).toBe(202);
      };
    });
  });
});
