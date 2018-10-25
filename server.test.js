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
        .send({ name: 'sam', breed: 'black labrador', age: 5 });
      expect(response.status).toBe(201);
    })
    it('returns JSON format', async () => {
      const response = await request(server)
        .post('/dogs')
        .send({ name: 'sam', breed: 'black labrador', age: 5 });
      expect(response.type).toBe('application/json');
    })
    it('returns correct content', async () => {
      const response = await request(server)
        .post('/dogs')
        .send({ name: 'sam', breed: 'black labrador', age: 5 });
      expect(response.body).toEqual({ mensaje: 'El perro fue creado!' });
    })
  })
})