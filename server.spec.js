const request = require('supertest');
const server = require('./api/server.js');

describe('Server.JS', () => {
    describe('"/" Route', () => {
        it('Return status 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200)
        })
    })
})