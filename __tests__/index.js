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

    describe('post endpoint', () => {
        test('returns JSON', async () => {
            let response = await request(server)
                .post('/')
                .send(({ userName: 'Yusuf' }));
            expect(response.type).toBe('application/json');
        });
        test('returns status code 500 if failed', async () => {
            let response = await request(server)
                .post('/')
                .send();
            expect(response.status).toBe(500);
        });
    });

    describe('/:id delete endpoint', () => {
        test('returns status code 500', async () => {
            let response = await request(server).delete('/:id');
            expect(response.status).toBe(500)
        });
        test('deletes user', async () => {
            let response = await request(server)
                .delete('/:id')
                .send({ _id: 5, name: 'joe' })
            expect(response.body).toEqual({ message: 'user has been deleted' });
        });
    });
});