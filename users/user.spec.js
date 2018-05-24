const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user');
const request = require('supertest');
const server = require('../server');

describe('POST & DELETE to /users', () => {
  const user = { username: 'jeffrey', password: 'flynn' };
  
  beforeAll(() => { // establish connection to database
    return mongoose
      .connect('mongodb://localhost/testing-db')
      .then(console.log('connected to test database'))
      .catch(console.log('error connecting to test database'))
  });

  afterEach(() => User.remove()) // clear database collection after each test runs

  afterAll(() => mongoose.disconnect()) // disconnect from database after all tests run

  it('should fetch existing users', async () => {
    const response = await request(server).get('/users');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).not.toBeUndefined();
  })

  it('should create a new user', async () => {
    const response = await request(server).post('/users').send(user);
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body.username).toBeTruthy();
  })

  it('should locate a specific user with a provided ID', async () => {
    const newUser = await User.create(user);
    const response = await request(server).get(`/users/${newUser._id}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.username).toBe(user.username);
  })

  it('should delete an existing user', async () => {
    const newUser = await User.create(user);
    const response = await request(server).delete(`/users/${newUser._id}`);
    const users = await User.find();
    expect(response.status).toBe(200);
    expect(users).toHaveLength(0);
  })
  
  it('should not allow passwords less than 5 characters long', async () => {
    const badPasswordUser = { username: 'brandon', password: 'poop' };
    const invalidUser = () => {
      if (badPasswordUser.password.length < 5) throw 'password too short';
      else User.create(badPasswordUser);
    }
    expect(invalidUser).toThrow();
  })
  
  it('should hash the password before saving a user', async () => {
    const savedUser = await User.create(user);
    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password.length).toBe(60);
  })

  it('should not allow duplicate usernames', async () => {
    const savedUser = await User.create(user);
    const duplicate = User.create(user);
    expect(duplicate._id).toBeUndefined();
  })

})