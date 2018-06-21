const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    it('should have api running with a status code of 200', async() => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    })
})
