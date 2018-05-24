const request = require('supertest');
const mongoose = require('mongoose');

const server = require('./server');

describe('server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'))
      .catch(err => console.log(err)); 

  });

  it('should save a fries object', async () => {
    const fries = {
      size: 'small',
      salt: true,
      ketchup: false
    };

    let response;

    try {
    response =  await request(server)
      .post('/api/fries')
      .send(fries) 
      .set('Accept', 'application/json');
    } 
    catch(err) {
      console.log(err);
    }

    delete response.body.__v;
    delete response.body._id;

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(fries);
  });

});
