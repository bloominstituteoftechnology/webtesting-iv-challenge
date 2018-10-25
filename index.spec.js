/*  
use jest and supertest to write the tests.
Your API must be able to create and delete a resource of your choosing.
Write a minimum of two tests per route handler.
Add tests to verify that the endpoints return the correct HTTP status codes.
Write the tests BEFORE writing the route handlers.

*/


const server = require('./api/server.js');

const request = require('supertest');

describe('server', () => {
    describe('GET /api/people', () => {
        it('should return status code 200(OK)', async () => {
            const response = await request(server).get('/api/people')

            expect(response.status).toBe(200);
            });
        
        it('should return JSON', async () => {
            const response = await request(server).get('/api/people');
    
            expect(response.type).toBe('application/json');
        })

        it('should return an object with the people', async () => {
            const response = await request(server).get('/api/people');

            const expected = {
                person: "Snoop Dogg",
                person: "Elon Musk"
            };

            expect(response.body).toEqual(expected)
        })
    })

    describe('POST /api/people/:person', () => {
        it('should create and return the new person', async () => {
            const person = "Bob Ross";
            const response = await request(server).post(`/api/people/${person}`);
            const expected = "Bob Ross";
            expect(response.body).toEqual(expected)
        })
        it('should return status 201', async () => {
            const person = "Bob Ross";
            const response = await request(server).post(`/api/people/${person}`);
            expect(response.status).toEqual(201);
        })
    })

    describe('DELETE /api/people/:id', () => {
        it('should return status 200', async () => {
            const id = '0';
            const response = await request(server).delete(`/api/people/0`);
            expect(response.status).toBe(200);
        })

        it('should delete an item from url param ID', async () => {
            const id = 0;
            const response = await request(server).delete(`/api/people/0`);
            expect(response).toBe(id);
        })
    })

})