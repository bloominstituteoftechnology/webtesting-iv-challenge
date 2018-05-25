const request = require('supertest');
const server = require('./server');

describe('server', () => {
    it('should return OK and a json object from the root route', async () => {
        const expectedBody = { API: 'API RUNNING' };
        const response = await request(server).get('/');

        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    })
})