const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    });

    describe('GET /', () => {
        it('returns 200 status code', async () => {
            const response = await request(server).get('/');
            expect(response.status).toEqual(200)
        });

        it('should return people', async () => {
            const expectedBody = { people:'James' };
            const response = await request(server).get('/people');
            expect(response.body).toEqual(expectedBody)
        });

        it('should return { people:"James" }', async () => {
            const expectedBody = { people:'James' };
            const response = await request(server).post('/people');
            expect(response.body).toEqual(expectedBody)
        });

        it('should return empty object', async () => {
            const expectedBody = { };
            const response = await request(server).delete('/people');
            expect(response.body).toEqual(expectedBody)
        });
    });
});