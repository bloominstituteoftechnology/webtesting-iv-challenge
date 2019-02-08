const request = require('supertest');
const server = require('../api/server');

describe('The route handlers', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server).get('/');

            expect(response.type).toMatch(/json/i);
        });
    });

    describe('post /character', () => {
        it('responds with 201', async () => {
            const response = await request(server).get('/character');

            expect(response.status).toBe(201);
        });
    });

    it('responds with the id', async () => {
        const response = await request(server).get('/character');

        expect(response.body).toBeDeFined();
    });
});