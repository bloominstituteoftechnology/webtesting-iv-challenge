const server = require('./server.js');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Films Router', () => {
  it('it should return OK and a JSON object from the index route', async() => {
    const response = await request(server).get('/')

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ api: 'running ' });
    expect(response.type).toEqual('application/json');
  });
});

describe('Films Router - Create Films', () => {
  it('POST create', async() => {
    const newFilm = { title: 'A New Hope - Something' }
    const response = await request(server).post('/films')
      .send(newFilm)
    expect(response.status).toEqual(201)

  });
});

describe('Films Router - Delete Films', () => {
  it('DELETE', async() => {
    const response = await request(server).delete('/films/5b2c42cd7831a359e7bb8655')
    expect(response.status).toEqual(200)
  });
});
