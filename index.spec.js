const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
    describe('/ route', () => {
        it('should return a status code 200', async () => {
            let response = await request(server).get('/');

            expect(response.status).toBe(200);
            //expect(response.status).toBe(500);
        });

        it('should return JSON', async () => {
            let response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });
    });

    describe('POST /addUser endpoint', () => {
        it('should add a user', async () => {
            let response = await request(server)
                .post('/addUser')
                .send({ firstName: 'Shawn', lastName: 'Antonucci' });

            expect(response.body).toEqual({ Added: 'Shawn Antonucci' });
        });
    });

    describe('delete / endpoint', () => {
        it('should delete a user', async () => {

        });
    });

});