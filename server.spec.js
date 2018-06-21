/*
- When making a GET request to the '/' endpoint
the API should respond with status code 200
and the follow JSON object: {api: 'running}
*/

const server = require('./server');
const request = require('supertest')

describe('server.js', () => {
    it('should return OK and a JSON object from the index route', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');
        expect(response.status).toEqual(expectedStatusCode)
        expect(response.body).toEqual(expectedBody)
        expect(response.type).toEqual('application/json')
        // 
    })
})

