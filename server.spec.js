const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    it('should return OK and JSON object from index route)', async () => {
        const exectedStatusResponse = 200;
        const expectedJsonRespone = {api: 'up and running'}

        const response = await request(server).get('/');

        expect(response.status).toEqual(exectedStatusResponse);
        expect(response.body).toEqual(expectedJsonRespone);
        expect(response.type).toEqual('application/json');
    });
});