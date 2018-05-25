const request = require('supertest');

const server = require('./server');

describe('/', () => {
    it('running server', async () => {
        const expected = { API: 'Running!' };

        const response = await request(server).get('/');

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expected);
    });
});