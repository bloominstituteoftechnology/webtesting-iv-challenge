const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
  it('can run tests', () => {
    expect(1).toBeTruthy();
  })
  it('can run more tests', () => {
    expect(0).toBeFalsy();
  })

  describe('GET / route', () => {
    it('returns status code of 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    })
    it('returns JSON format', async () => {
      const response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    })
    it('returns correct content', async () => {
      const response = await request(server).get('/');
      expect(response.body).toEqual({ message: 'En vivo!' });
    })
  })

  describe('POST /dogs route', () => {
    it('returns status code of 201', async () => {
      const response = await request(server)
        .post('/dogs')
        .send({ id: 4, name: 'sam', breed: 'black labrador' });
      expect(response.status).toBe(201);
    })
    it('returns JSON format', async () => {
      const response = await request(server)
        .post('/dogs')
        .send({ id: 5, name: 'sam', breed: 'black labrador' });
      expect(response.type).toBe('application/json');
    })
    it('returns correct content', async () => {
      const response = await request(server)
        .post('/dogs')
        .send({ id: 6, name: 'sam', breed: 'black labrador' });
      expect(response.body).toEqual({ mensaje: 'El perro fue creado!' });
    })
  })

  describe('DELETE /dogs/:id route', async () => {
    it('returns a status code of 202', async () => {
      const response = await request(server).delete(`/dogs/1`)
      expect(response.status).toBe(202);
    })
    it('returns JSON format', async () => {
      const response = await request(server).delete('/dogs/1')
      expect(response.type).toBe('application/json');
    })
    it('returns as an object', async () => {
      const response = await request(server).delete('/dogs/1')
      expect(typeof response.body).toEqual('object');
    })
    it('returns new array without deleted dog', async () => {
      const response = await request(server).delete('/dogs/1')
      const expected = [
        { "breed": "samoyed", "id": 2, "name": "Lulu" },
        { "breed": "pomeranian", "id": 3, "name": "Icy" },
        { "breed": "black labrador", "id": 4, "name": "sam" },
        { "breed": "black labrador", "id": 5, "name": "sam" },
        { "breed": "black labrador", "id": 6, "name": "sam" }
      ]
      expect(response.body).toEqual(expected);
    })
  })
})