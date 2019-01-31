const request = require('supertest');

const server = require('./server.js');

describe('POST /users endpoint', () => {

    it('should add a new user to the database', async () => {
      const body = { name: 'Stephen Waffle', "favorite_movie": 'Lamda Strikes Back' };

      let response = await request(server)
        .post('/users')
        .send(body);

      expect(response.body).toEqual([11]);

    });

    it('should return 400 if user name or favorite movie is missing', async () => {
      let response = await request(server)
        .post('/users')
        .send({ name: 'Frodo Bagel' });
      expect(response.status).toBe(400);

      response = await request(server)
        .post('/users')
        .send({ "favorite_movie": 'What a heck' });
      expect(response.status).toBe(400);
    });
  });

describe('DELETE /users/:id endpoint', () => {

    it('should delete a user from the database', async () => {
        
        let response = await request(server)
        .delete(`/users/:1`);

        expect(response.status).toBe(200);
        
      });

});