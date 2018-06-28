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
    it('should return a created username and password', async() => {
        const expectedBody = { username: 'kelly', password: 'password'};

        const newUser = await request(server).post('/user').send(expectedBody);

       
        expect(newUser.username).toEqual(newUser.username);
        expect(newUser.password).toEqual(newUser.password);
   
    });
    it('should delete user and password', async() => {
        const expectedBody = { username: 'kelly', password: 'password' };
        const newUser = await request(server).post('/user').send(expectedBody);
        const deleteUser = await(server).delete('/user')

        expect(newUser.username).toEqual(newUser.username);
        expect(newUser.password).toEqual(newUser.password);
        expect(deleteUser.username).toEqual(newUser.username);
        expect(deleteUser.username).toEqual(newUser.password);
    });
    });
