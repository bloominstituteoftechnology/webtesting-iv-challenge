const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
    it('should return status of 200 and JSON `is running` object', async () => {
        const expectedCode = 200;
        const expectedBody = { api: `running`};
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedCode);
        expect(response.body).toEqual(expectedBody);
    })
});