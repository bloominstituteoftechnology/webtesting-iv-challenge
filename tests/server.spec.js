const request = require('supertest');

const server = require('../server');

describe('server.js', () => {
    it('should return an OK status code and a JSON object fron the index route', async () => {
        // it('should return an OK status code and a JSON object fron the index route', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        // do a get request to our api (server.js) and inspect the response
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');

    });
});

describe('Testing my root path', () => {
    it('Should respoNd to GET method', () => {
        request(App).get('/').then(response) => {
            expect(response.statuscode).toBe(200);
            done();
        });

});

});

