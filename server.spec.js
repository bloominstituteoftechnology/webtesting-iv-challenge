const request = require('supertest');

const server = require('./server'); // This is our first red, it doesn't exist.

describe('server.js', () => {
    it('Should return an "okay" status code and a JSON object from the index route.', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'Running...'}

        // Do a GET request to our API (in server.js) and inspect the response 
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');

        // Create the user
        let supertestResponse = await request(server).get('/123');
        // Check that the user exists            
        supertestResponse = await request(server).delete('/123');
        supertestResponse = await request(server).get('/123');
        // Check that the user is not there any more.

        // using .then()
        // let response;
        // return request(server).get('/').then(res => {
        //   response = res;

        //   expect(response.status).toEqual(expectedStatusCode);
        //   expect(response.body).toEqual(expectedBody);
        //   expect(response.type).toEqual('application/json');
        // })
    });
});

