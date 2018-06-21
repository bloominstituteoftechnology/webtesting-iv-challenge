const mongoose = require('mongoose');
const server = require('../server');
const request = require('supertest');

describe('userRouter', () => {
    it('should create a new user', async() => {
        const statusCode = 201;
        const user = { username: 'gollum', password: 'precious' };
        
        const response = await request(server).post('/api/users').send(user).set('Accept', 'application/json');

        expect(response.status).toEqual(statusCode);
    })
})
