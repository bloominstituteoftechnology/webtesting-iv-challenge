const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {

    describe('GET /', () => {
        it('returns a 200 status code from "/"', async () => {
            const response = await request(server).get('/');
    
            expect(response.status).toEqual(200);
        });
        it('should return "API Running..."', async () => {
            const expectedBody = "API Running..."
            const response = await request(server).get('/');
            
            expect(response.body).toEqual(expectedBody);
        });
    });
    
});