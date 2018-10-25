const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    describe('GET /', () => {
        it('should return status code 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    });

    describe('POST /api/icecream', () => {
       it('should return status code 201', async () => {
           const response = await request(server).post('/api/icecream');

           expect(response.status).toBe(201);
       });

       it('should return JSON', async () => {
           const response = await request(server).post('/api/icecream')

           expect(response.type).toBe('application/json');
       }); 
    });

    describe('DELETE /api/:id', () => {
        it('should return status 200', async () => {
            const id = 1;
            const response = await request(server).delete(`/api/${id}`);
           
            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            const id = 1;
            const response = await request(server).delete(`/api/${id}`);
 
            expect(response.type).toBe('application/json');
        });
    });

});