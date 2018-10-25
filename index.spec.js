const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
    describe('GET /', () => {
        it('should return status code 200(OK)', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });
    });

    describe('POST /players/:character', () => {
        it('should greet the player by name and job class', async () => {
            const character = 'Ezra';
            const jobClass = 'Knight';

            const expected = { hello: 'Ezra the Knight' };

            const response = await request(server)
                .post(`/players/${character}`);

            expect(response.body).toEqual(expected);
                
        });
    });
});