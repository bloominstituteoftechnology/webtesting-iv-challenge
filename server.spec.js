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

    describe('DELETE /api/dogs/id', () => {
        it('should return a 200 status code', async () => {
            let id = '1';

            const response = await request(server)
            .delete(`/api/dogs/${id}`)

            expect(response.status).toEqual(200);
        })
        it('should return a message saying delete was successful', async () => {
            let id = '1';

            const response = await request(server)
            .delete(`/api/dogs/${id}`)

            const expectedBody = { message: 'The dog with ID 1 was deleted.' }
            expect(response.body).toEqual(expectedBody);
        })
    })
    
});