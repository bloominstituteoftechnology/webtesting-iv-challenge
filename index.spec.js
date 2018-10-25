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
        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });
        it('should greet the player by name and job class', async () => {
            const character = 'Ezra';
            const jobClass = 'Knight';

            const expected = { hello: 'Ezra the Knight' };

            const response = await request(server)
                .post(`/players/${character}`)
                .send({ jobClass });

            expect(response.body).toEqual(expected);
                
        });
        it('should greet the player as a "Peasant" if no job class is provided', async () => {
            const character = 'Ezra';

            const expected = { hello: 'Ezra the Peasant' };

            const response = await request(server)
                .post(`/players/${character}`);

            expect(response.body).toEqual(expected);
        });
    });

    describe('DELETE /players/:character', () => {
        it('should return status code 200(OK) if delete is successful', async () => {
            const character = 'Ezra';
            const response = await request(server).delete(`/players/${character}`);

            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        })
    })
});