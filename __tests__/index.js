const request = require('supertest');

const server = require('../api/server.js')

describe('server.js', () => {
    describe('/ route', async () => {
        test('returns status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        test('returns JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        test('returns body { api: "up" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        });
    });

    describe('/greet post endpoint', () => {
        test('returns JSON', async () => {
            let response = await request(server)
                .post('/greet')
                .send(({ firstName: 'Yusuf' }));
            expect(response.type).toBe('application/json');
        });
        test('greets user', async () => {
            let response = await request(server)
                .post('/greet')
                .send({ firstName: 'Yusuf', lastName: 'Nafey' });
            expect(response.body).toEqual({ hello: 'Yusuf Nafey' });
        });
    });

    describe('/:id delete endpoint', () => {
        test('', async () => {

        });
        test('', async () => {

        });
    })
});