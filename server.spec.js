const request = require('supertest');
const mongoose = require('mongoose');

const User = require('./user/User.js');
const server = require('./server');

describe('server.js', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/servertestdb');
    });

    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });
    

    it('should reurn an OK status code and a JSON object from the index route', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };
        const response = await request(server).get('/');
        
        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });
    it('should return a status code, username, and password', async()=> {
        const expectedStatusCode = 201;
        const expectedBody = { username: 'kelly', password: 'password'};

        const newUser = await request(server).post('/user').send(expectedBody);

        expect(response.status).toEqual(expectedStatusCode);
        expect(newUser.username).toEqual(newUser.username);
        expect(newUser.password).not.toEqual(newUser.password);
   
    });
    });
