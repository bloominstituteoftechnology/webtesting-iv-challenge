const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./server');
const User = require('./User/User.js');

// const server = require('./server'); // This is our first red, it doesn't exist.

describe('server.js', () => {

    beforeAll(() => {
        return mongoose.connect('mongod://localhost/server-testing-db');
    });

    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    })

    it('Should return an "okay" status code and a JSON object from the index route.', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'Running...'}

        // Do a GET request to our API (in server.js) and inspect the response 
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });

    it('Should return a JSON object with the created user and a created status code.', async () => {
        const expectedStatusCode = 201;
        const expectedBody = { username: 'paulgraham', password: 'ycombinator' };

        const newUser = await request(server).post('/users').send(expectedBody);
    
        expect(newUser.body.username).toEqual('paul graham');
        expect(newUser.body.password).not.toEqual('ycombinator');
    });

    it('Should return a JSON object with the deleted user and a deleted status code.', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { username: 'paulgraham', password: 'ycombinator' };

        const newUser = await request(server).post('/users').send(expectedBody).set('Accept', 'application/json');
        const deleteUser = await request(server).delete(`/users/${newUser.body._id}`).set('Accept', 'application/json');

        expect(newUser.body.username).toEqual('paulgraham');
        expect(newUser.body.password).not.toEqual('ycombinator');

        expect(deleteUser.body.username).toEqual('paulgraham');
        expect(deleteUser.body.password).not.toEqual('ycombinator');
    });

        // // Create the user
        // let supertestResponse = await request(server).get('/123');
        // // Check that the user exists            
        // supertestResponse = await request(server).delete('/123');
        // supertestResponse = await request(server).get('/123');
        // // Check that the user is not there any more.

        // // using .then()
        // // let response;
        // // return request(server).get('/').then(res => {
        // //   response = res;

        // //   expect(response.status).toEqual(expectedStatusCode);
        // //   expect(response.body).toEqual(expectedBody);
        // //   expect(response.type).toEqual('application/json');
        // // })

});

