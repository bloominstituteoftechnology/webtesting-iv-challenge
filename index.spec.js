const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  // R O O T   R O U T E
  describe('root route', () => {
    it('should send back a 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });
  });

  // P O S T   R O U T E

  describe('post route', () => {
    it('should submit an album with the keys "name" and "title"', async () => {
      let response = await request(server)
        .post('/albums')
        .send({ name: 'Jon Bap', title: 'What Next' });
      expect(response.body).toEqual({ message: 'successfully added' });
    });

    it('should return a HTTP code of 202', () => {
      async () => {
        let response = await request(server)
          .post('/albums')
          .send({ name: 'Jon Bap', title: `What's Next` });
        expect(response.status).toBe(201);
      };
    });
  });

  //D E L E T E    R O U T E

  describe('delete route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).delete('/albums/1');
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });
  });
});
