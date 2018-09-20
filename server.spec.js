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

    describe('POST /api/dogs', () => {
        it('should return JSON', async () => {
            let breed = 'dalmation';
            
            const response = await request(server)
            .post('/api/dogs')
            .send({ breed })

            expect(response.type).toEqual('application/json');
        });
        it('should return a dog breed', async () => {
            let breed = 'dalmation';
            
            const response = await request(server)
            .post('/api/dogs')
            .send({ breed })

            const expectedBody = { breed: 'dalmation' }
            expect(response.body).toEqual(expectedBody);
        });
    });
    
});