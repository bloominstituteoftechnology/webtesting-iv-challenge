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
});

describe('POST/ greet', () => {
  it ("should return { hello: name } when name provided inside body", async () => {
    //arrange
    const expected = { hello: 'bilbo' };

    // act
    const response = await request(server)
      .post('/greet')
      .send({ name: 'bilbo'})

    // assert
    expect(response.body).toEqual(expected);
  })
})
