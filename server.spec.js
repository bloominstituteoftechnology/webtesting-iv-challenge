const request = require('supertest');

const server = require('./server.js');


//Tests for / endpoint
describe ('get request for /', () => {
    it('returns a 200 status code', async () => {
        //get access to the server
        //use super test to run a get request to server
        const response = await request(server).get('/');

        expect(response.status).toEqual(200);
    });
    it('returns {api: "running"}', async () => {
        const expectedBody = { api: 'running'}
        const response = await request(server).get('/');
        
        expect(response.body).toEqual(expectedBody);
    });
});

describe('get request for users', () => {
    it('returns a list of users', async () => {
        let response = await request(server)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

describe('/greet/:name', () => {
    it('greets the person by name', async () => {
        let first = 'Harry';
        let last = 'Potter';
        //make a post passing last name into body
        //first name is a url parameter
        let response = await request(server)
            .post(`/greet/${first}`)
            .send({ last });
        //verify that the endpoint returns the right object
        expect(response.body).toEqual({ hello: 'Harry Potter' });
    })
})