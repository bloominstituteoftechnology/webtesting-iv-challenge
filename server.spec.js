const friendController = require('./friendController.js');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Films Router', () => {
  it('it should return OK and a JSON object from the index route', async() => {
    const response = await request(friendController).get('/')

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ api: 'running ' });
    expect(response.type).toEqual('application/json');
  });
});

describe('User Model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testdb');
  })
  afterEach(() => {
    return User.remove;
  })
  afterAll(() => {
    return mongoose.disconnect()
  })
  it('it should hash the password before saving the user', async() => {
    const bilbo = { username: 'bilbo', password: 'baggins' }
    const savedUser = await User.create(bilbo)
    expect(savedUser.password).not.toEqual(bilbo.password);
    expect(savedUser.password).toHaveLength(99);
  });
});
