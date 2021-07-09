const request = require('supertest');
const server = require('../server.js'); 

describe('server.js', () => {
  
  describe('CREATE /users', () => {
 
    it('should return JSON', async () => {
      const expected = 'application/json';
      const response = await request(server)
      .post('/users')
      .send({});

      expect(response.type).toEqual(expected);
    });
    
    it(`should return status code 400 Bad Request when name is not provided`, async () => {
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

  describe('DELETE /user/:id', () => {
 
    it(`should return status code 404 Not Found with a JSON response when the user id doesn't exist`, async () => {
      const expected = 404;
      const response = await request(server).delete('/user/1000').expect('Content-type', /json/);

      expect(response.status).toEqual(expected);
    });

    it(`should return the JSON object { name: 'tyson', title: 'dev' } when the user with id 0 has been deleted`, 
      async () => {
        const expected = { id: 0, name: 'tyson', title: 'dev' };
        const response = await request(server).delete('/user/0').expect('Content-type', /json/);

        expect(response.body).toEqual(expected);
    });
  });

});