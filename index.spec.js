const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    it('can run test', () => {
        expect(true).toBeTruthy();
    });

    it('can respond with status code 200 (ok)', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });

    it('can return JSON', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({ message: `server is up` });
    });

});