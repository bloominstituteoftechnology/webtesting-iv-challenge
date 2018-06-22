const mongoose = require('mongoose');
const server = require('../server');
const request = require('supertest');
const User = require('./User');
const faker = require('faker');

describe.only('userRouter', () => {
    describe('POST', () => {
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
    
    describe('DELETE', () => {
        beforeAll(() => {
            return mongoose.connect('mongodb://localhost/testdb')
        })
        afterAll(() => {
            return mongoose.disconnect();
        })
        it('should return status code 200 and remove user', async () => {
            const { userName, password } = faker.internet;
            const statusCode = 200;
            const user = { username: userName(), password: password() };

            const newUser = await User.create(user);
            console.log(newUser);
            const response = await request(server).delete(`/api/users/${newUser._id}`);

            const users = await User.find();

            expect(response.status).toEqual(statusCode);
            expect(response.body.success).toEqual(`User has been removed from the database.`);
        })
    })
})

