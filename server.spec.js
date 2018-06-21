/* 
    When a making a GET to the '/' endpoint 
    the API should respond with status code 200
    and the following JSON object: {api: 'running'}. 
*/
const request = require('supertest');

const server = require('./server'); // this is our first red, it doesn't exist

describe('server.js', () => {

    let token;

    it('It should return OK status code and a JSON object from the index route.', async () => {
        
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };
        // do a get request to our api (server.js) and inspect the response
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');

        // let response; 
        // return request(server).get('/').then(res => {
        //     response = res;

        //     expect(response.status).toEqual(expectedStatusCode); 
        //     expect(response.body).toEqual(expectedBody); 
        //     expect(response.type).toEqual('application/json'); 
        // })
    });

    it('It should return a status code of 201 and return the username when a username and password is passed to the body of a post request for path /api/signup.', async () => {
        
        const expectedStatusCode = 201;
        const expectedBody = { username: 'eddy' };
        const response = await request(server).post('/api/signup').send({ username: 'eddy', password: 'pass' });
        
        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });

    it('It should return a status code of 201 and return a token when a user successfully logs in.', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).post('/api/login').send({ username: 'eddy', password: 'pass' });

        expect(response.status).toEqual(expectedStatusCode);

        token = response.body.token;
    });

    it('It should return a status code of 201 and only allow a user to view all users if they are logged in with a genuine token.', async () => {
        const expectedStatusCode = 200; 
        const response = await request(server).get('/api/users').set('Authorization', token); 

        expect(response.status).toEqual(expectedStatusCode); 
        expect(response.body.length).toBeGreaterThanOrEqual(1); 
    }); 
})