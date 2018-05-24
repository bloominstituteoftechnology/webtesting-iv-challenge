const request = require('supertest');
const mongoose = require('mongoose');

const User = require('./Users/User');
const server = require('./server');



describe('server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'));
  });
  
  afterAll(() => {
    console.log('disconnecting from db');
    return mongoose.disconnect();
  });
  
  afterEach(() => {
    return User.remove();
  })
  
  
  it('should return right status code, get req and expected res', async () => {
    const expectedBody = { api: 'running' };
    const response = await request(server).get('/');
    
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(expectedBody);
  });
  
  it('should implement POST', async () => {
    const user = {
      username: 'user',
      password: 'pass',
    };
  
    const response = await request(server).post('/register').send(user)
    //console.log(response.body);
    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body.newUser.username).toEqual(user.username);
  });
  
  
  it('should delete user given username', async () => {
    const user = {
      username: 'user',
      password: 'pass',
    };
  
    const todel = await request(server).post('/register').send(user)
  
    const response = await request(server).del('/delete/user')
    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('user deleted');
  });
  
  
});
