/*
when making a GET to the '/' endpoint the API should respond with status code 200 
and the following JSON object: `{ api: 'running' }`.
*/

const request = require('supertest');

const server = require('./server'); //this is our first red, it doesn't exist

describe('server.js', () => {
    it('should return OK status code and a JSON object from the index route', async() => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        //do a get request to our api (server.js) and inspect the response
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });

    /*
    //another version of previous test but w/o ASYNC AWAIT
    it('should return OK status code and a JSON object from the index route', () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        //do a get request to our api (server.js) and inspect the response
        //const response = await request(server).get('/');
        let response;
        return request(server).get('/').then(res => {
            response = res;
        })

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });
    */


});