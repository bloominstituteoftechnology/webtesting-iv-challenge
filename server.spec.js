const request = require('supertest');
const mongoose = require('mongoose');
const User = require('./users/Users');
const server = require('./server');

describe('server', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/servertestDB')
            .then(console.log('connected to database'));
    });

    beforeEach(() => {});
    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should respond with a 200 code and api: running', async () => {
        const expected = { api: 'running' };
        expect(response.status).toEqual(200);

        const response = await request(server).get('/');
        expect(response.body).toEqual(expectedBody);
    });

    it('should respond with a 201 code and the user object when one is created', async () => {
        const expected = { username: 'lambda', password: 'school' };
        expect(response.status).toEqual(201);

        const response = await request(server)
            .post('/api/users')
            .send(expected);
        expect(response.body.username).toEqual(expected.username);            
    })

    test('should give a 200 code for a delete', () => {
        return request(server)
            .delete('/')
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

})

