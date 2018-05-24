const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('should return right status code, get req and expected res', async () => {
    const expectedBody = { api: 'running' };
    const response = await request(server).get('/');
    
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(expectedBody);
  });
  
  // it('should implement POST', async () => {
  //   const = { api: 'running' };
  //   const response = await request(server).get('/');
  // 
  //   expect(response.status).toEqual(200);
  //   expect(response.type).toEqual('application/json');
  //   expect(response.body).toEqual(expectedBody);
  // });
  
  
});
