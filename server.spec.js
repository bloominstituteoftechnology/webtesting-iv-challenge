const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('should run the tests', () => {
        expect(true).toBeTruthy();
    })

    describe('GET /', () => {
        it('returns a 200 status code (OK)', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    });
});