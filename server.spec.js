const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('should return a 200 status from the main route', async() => {
    const expectedStatusCode = 200;
    const response = await request(server).get('/');
    expect(response.status).toEqual(expectedStatusCode);
  });

  it('should return a list of users from /users route', async() => {
    const response = await request(server).get('/users');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
   // expect(response.body).toHaveLength(3);
  });

  it('should post new users', async() => {
    const newUser = { username: 'goodbye', password: 'hello' };
    const response = await request(server).post('/').send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('password');
  });
  
  it('should be able to update existing user', async() => {
    const updatedUser = { username: 'smurf', password: 'goodbye' };
   // const id = '5b2c2471bc766828ff7d14fc';
    const response = await request(server).put('/put').send(updatedUser);
  
    expect(response.status).toEqual(200);
  });
 
  it('should delete user and return a status message', async() => {
    //let id = '5b2c181ce6be5a2581435451';
    const response = await request(server).delete('/delete');
    expect(response.body).toEqual('deleted');
  });
 
});
