const request = require('supertest');
const server = require('../server.js'); 

describe('server.js', () => {
  
  describe('POST /users', () => {
 
    it('should return JSON', async () => {
      const expected = 'application/json';
      const response = await request(server)
      .post('/users')
      .send({ name: 'tyson', title: 'dev' });

      expect(response.type).toEqual(expected);
    });
    
    it(`should return status code 400 OK when name is not provided`, async () => {
      const expected = 400;
      const response = await request(server)
      .post('/users')
      .send({ title: 'dev' });

      expect(response.status).toEqual(expected);
    });

    it(`should return status code 201 Created when name and title is provided`, async () => {
      const expected = 201;
      const response = await request(server)
      .post('/users')
      .send({ name: 'tyson', title: 'dev' });

      expect(response.status).toEqual(expected);
    });

    it(`should return { name: 'tyson', title: 'dev' } when name and title are provided`, 
      async () => {
        const expected = { name: 'tyson', title: 'dev' };

        const response = await request(server)
          .post('/users')
          .send({ name: 'tyson', title: 'dev' });

        expect(response.body).toEqual(expected);
    });
  });

});