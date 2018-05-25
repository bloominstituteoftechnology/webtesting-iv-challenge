const server = require('./server.js')
const request = require('supertest');
const User = require('./usersModel.js');
const mongoose = require('mongoose');

describe('testing the server', () => {

  beforeAll(() => {
    return (mongoose
      .connect('mongodb://localhost:27017/testingDb')
      .then(console.log('connected to testingDb'))
    );
  });



  it('server is running ', async () => {

    const expectedBody = { api: 'running!' };
    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(expectedBody);

  });

  it('posting ', async () => {

    const obj = { username: 'alalalaaaaaaaaa', password: 'lambda' };
    const savedUser = await User.create(obj); // new + sav
    console.log('ssss', savedUser);

    // const expectedBody = { msg: 'user successfully added' };
    // let response = await request(server).post('/users');


    // expect(response.status).toBe(200);
    // expect(response.type).toEqual('application/json');
    // expect(response.body).toEqual(expectedBody);

  });



})