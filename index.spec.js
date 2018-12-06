const request = require('supertest');

const server = require('./api/server');

describe('server.js', () => {

    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/'); // supertest makes the call!
            expect(response.status).toBe(200); // jest makes the comparison
        })
    }); 

    describe('POST /createUser endpoint', () => {
        it('should return the object { hello: howdy }', async () => {
            
        });
    });

});