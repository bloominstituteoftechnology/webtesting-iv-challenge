const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
  it('should return an OK status code and JSON object as the response', async () => {
    const statusCode = 200;
    const body = { api: 'running' };
    const response = await request(server).get('/');

    expect(response.status).toEqual(statusCode);
    expect(response.body).toEqual(body);
  });

  // it('should return a list of all users', async () => {
  //   const body = { username: 'Brandon', password: 'pass' };
  //   const response = await request(server).get('/api/users');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].username).toEqual(body.username);
  // });

  it('should return a status code of 201 and the created user', async () => {
    const body = { username: 'Brandon', password: 'pass' };
    const response = await request(server).post('/api/users').send(body).set('Accept', 'application/json');

    expect(response.status).toEqual(201);
    
    // request(server).post('/api/users')
    //   .send(body)
    //   .set('Accept', 'application/json')
    //   .expect(res => {
    //     res.body.username = body.username;
    //   })
    //   .expect(201, {
    //     name: body.username
    //   }, done)
  });

  // it('should return a status code of 200 and the deleted user', async () => {
  //   const body = { username: 'Brandon', password: 'pass' };
  //   const response = await request(server).delete('/api/users/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body).toEqual(body);
  // });
});