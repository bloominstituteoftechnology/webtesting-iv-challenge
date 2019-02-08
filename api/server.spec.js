const request = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig.js');

describe('The route handlers', () => {
    describe('get /', () => {
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
})