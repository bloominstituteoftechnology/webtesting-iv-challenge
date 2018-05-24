const request = require('supertest');
const mongoose = require('mongoose');
const Fries = require('./FriesModel');

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
      .send(fries);
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

  it('should return error if post without fries data', async () => {
    let response;

    try {
    response =  await request(server)
      .post('/api/fries')
      .send(null);
    } 
    catch(err) {
      console.log(err);
    }

    expect(response.status).toBe(500);
    expect(response.body).toBe("Need to include fries data");
  });

  it('should delete a fries object', async () => {
    const fries = await Fries.findOne();

    let response;

    try {
    response =  await request(server)
      .delete(`/api/fries/${fries._id}`)
    } 
    catch(err) {
      console.log(err);
    }

    expect(response.status).toBe(200);
    expect(response.body).toEqual({"message": `Friend with id ${fries._id} deleted.`});
  });

  it('should return error if delete nonexistentid', async () => {

    let response;

    try {
    response =  await request(server)
      .delete(`/api/fries/98798798`)
    } 
    catch(err) {
      console.log(err);
    }

    expect(response.status).toBe(500);
    expect(response.body).toEqual({"errorMessage": "The fries information could not be removed."});
  });
});
