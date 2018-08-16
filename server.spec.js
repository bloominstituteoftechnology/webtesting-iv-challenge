const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('root endpoint', () => {
    it('should return statue code 200 OK', async () => {
      const expected = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expected);
    });  
    it('should return JSON', async () => {
      const expected = { api: 'running' };
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
      expect(response.body).toEqual(expected);
    })
  }); 

  describe('POST/ name', () => {
    it ("should return { hello: name } when name provided inside body", async () => {
      //arrange
      const expected = { hello: 'bilbo' };

      // act
      const response = await request(server)
        .post('/names')
        .send({ name: 'bilbo'})

      // assert
      expect(response.body).toEqual(expected);
    })
    it('should respond with status code 200', async () => {
      const response = await request(server)
        .post('/names/')
        .send({ lastName: 'baggins' });
      expect(response.status).toBe(200)
    })
  })

  describe('POST /names/:name', () => {
    it('should return { hello: name } when name provided inside body', async () => {
      // arrange
      const expected = { hello: 'frodo baggins' };

      // act
      const response = await request(server)
        .post('/names/frodo')
        .send({ lastName: 'baggins' });

      // assert
      expect(response.body).toEqual(expected);

    });

    it('should respond with status code 200', async () => {
      const response = await request(server)
        .post('/names/frodo')
        .send({ lastName: 'baggins' });
      expect(response.status).toBe(200)
    })
  });



  describe('DELETE /delete', () => {
    it('should delete a user with status code 204', async () => {
        const name = { name: 'Freddy' }

        const reponse = await request(server)
          .delete('/names/:name')
          .send( name )

        expect(response.status).toBe(204)
    })
    it('should return 404 if name is not found', async () => {
        const response = await request(server).delete('/names/:name').send({ name })
        expect(response.status).toBe(404)
    })
  })
});

