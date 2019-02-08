const request = require('supertest');

const server = require('./server.js');

describe('The route handlers', () => {
    describe('get /users', () => {
        it('responds with status code 200', async () => {
            const response = await request(server).get('/users');
            
            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server).get('/users');
            
            expect(response.type).toMatch(/json/i);
        });

        it('sends the correct response object', async () => {
            const response = await request(server).get('/users');
            
            expect(response.body).toEqual({});
        });
    });

    describe('post /users', () => {
        it('responds with status code 201', async () => {
            const body = { username: 'bruce', password: 'password'};
            const response = await request(server).post('/users').send(body);

            expect(response.status).toBe(201);
        });

        it('responds with 400 when body is missing data', async () => {
            const body = { username: 'samuel' };
            const response = await request(server).post('/users').send(body);

            expect(response.status).toBe(400);
        });

        it('responds with an array containing a new id', async () => {
            const body = { name: 'bilbo' };
            const response = await(server).post('/users').send(body);

            expect(response.body.length.toBe(1));
        });
    })
})