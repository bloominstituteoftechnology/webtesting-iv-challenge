const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
    it('should return status 200', async () => {
        let response = await request(server).get('/');

        expect(response.status).toBe(200);
    });
});