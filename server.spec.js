const request = require('supertest');
const getType = require('jest-get-type');
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
        it('should return JSON in the response', async () => {
            let breed = 'dalmation';
            
            const response = await request(server)
            .post('/api/dogs')
            .send({ breed })

            expect(response.type).toEqual('application/json');
        });
        it('should return an array in the response body', async () => {
            let breed = 'dalmation';
            
            const response = await request(server)
            .post('/api/dogs')
            .send({ breed })

            const type = getType(response.body);
            expect(type).toEqual('array');
        });
        it('should return status 400 if no breed is provided', async () => {
            let breed = '';
            
            const response = await request(server)
            .post('/api/dogs')
            .send({ breed })

            expect(response.status).toEqual(400);
        });
    });

    describe('GET /api/dogs', () => {
        it('should return an array in the response body', async () => {
            const response = await request(server).get('/api/dogs');
    
            const type = getType(response.body);
            expect(type).toEqual('array');
        });
        
        it('matches even if received contains additional elements', async () => {
            const response = await request(server).get('/api/dogs');

            const num = expect.anything();
            const expected = [{"breed": "dalmation", "id": num}];
            expect(response.body).toEqual(expect.arrayContaining(expected));
        });
    });

    describe('DELETE /api/dogs/id', () => {
        it.skip('should return a 204 status code if the id exists', async () => {
            let id = '1';

            const response = await request(server)
            .delete(`/api/dogs/${id}`)

            expect(response.status).toEqual(204);
        });
        it('should return a 404 status code if the id does not exist', async () => {
            let id = '1';

            const response = await request(server)
            .delete(`/api/dogs/${id}`)

            expect(response.status).toEqual(404);
        });
    });
    
});