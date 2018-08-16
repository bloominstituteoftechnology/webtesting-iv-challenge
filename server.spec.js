const codes = require('./statusCodes');

const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200 OK for the GET request', async () => {
            const response = await request(server).get('/');
            expect(response.status).toEqual(codes.OK);
        });
        it('should return JSON', async () => {
            const expected = [{"id": 1, "name": "red potion"}, {"id": 2, "name": "sword"}, {"id": 3, "name": "shield"}];
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/);
        });
    });
})