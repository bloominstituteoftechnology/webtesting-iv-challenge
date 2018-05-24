const request = require("supertest");

const server = require('./server');

describe('server', () => {
    it('Should return OK and json object from index route', async() => {
        const expectedBody = {api: "running"};

        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    })
})