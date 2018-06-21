const mongoose = require('mongoose');
const server = require('../server');
const request = require('supertest');
const User = require('./User');

describe('userRouter', () => {
    
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb')
    })
    afterEach(() => {
        return User.remove();
    })
    afterAll(() => {
        return mongoose.disconnect();
    })

    it('should return a status 201 code and a JSON object', async() => {
        const statusCode = 201;
        const user = { username: 'gollum', password: 'precious' };
        
        const response = await request(server).post('/api/users').send(user).set('Accept', 'application/json');

        expect(response.status).toEqual(statusCode);
        expect(response.type).toEqual('application/json');
        expect(typeof response.body).toEqual('object');
    })
})
