const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    it('should return OK status code and a JSON object from index route', async() => {
        const statusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');

        expect(response.status).toEqual(statusCode);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    })
})