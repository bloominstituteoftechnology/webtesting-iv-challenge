const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./server');
const User = require('./User/User.js');

describe('server.js', () => {

    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/servertestdb');
    });

    // afterEach(() => {
    //     return User.remove();
    // });

    // afterAll(() => {
    //     return mongoose.disconnect();
    // })

    it('should return an OK status code and a JSON object from the index route', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });

    it.skip('should return a JSON object with the created user and a Created status code', async () => {
        const expectedStatusCode = 201;
        const expectedBody = { username: 'braden', password: 'password' };

        const newUser = await request(server).post('/users', (expectedBody));

        expect(newUser.status).toEqual(expectedStatusCode);
        expect(newUser.body).toEqual(expectedBody);
        expect(newUser.type).toEqual('application/json');
    });
});