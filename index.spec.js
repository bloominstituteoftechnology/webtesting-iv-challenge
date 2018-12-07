const request = require('supertest');
const server = require('./api/server.js');

/*use jest and supertest to write the tests.
Your API must be able to create/POST and
delete/DELETE a resource of your choosing.
Write a minimum of two tests per route handler.
Add tests to verify that the endpoints return 
the correct HTTP status codes.
Write the tests BEFORE writing the route handlers.*/

describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);

        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');

        it('should return with a body like: { api: "working" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'working' });
        });
        });
        });
    });
    describe('POST /create route', () => {
        it('should return status code 200', async () => {
            let response = await request(server)
            .post('/create')
            .send({ task: 'cook', role: 'chef' });

            expect(response.body).toEqual({ work: 'cook, chef' });
            expect(response.type).toEqual('application/json');
        });
        
    });
    describe('DELETE/delete/:id route', () => {
        it('delete sends status code for success 202(Accepted)', async () => {
            let response = await request(server)
            .delete('delete/1')
            expect(response.status).toBe(202);
            expect(response.type).toEqual('application/json');
        });
});
});
