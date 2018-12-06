const request = require('supertest');
const server = require('../api/server');

describe('server.js', () => {

    describe('/route', () => {
        it('should return status code 200', async () => {
        const response = await request(server).get('/');

        expect(response.status).toBe(200);
        });

        it('should return json', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/xml');
        });

        it('should return { api: "running"}', async () => {
            let response = await request(server).get('/');
            expect(response.type).toEqual({ api: "running" });
        });
    });

    describe('/greet endpoint', () => {
        it('should greet the person', async() => {
            const body = { firstname: 'Ryan', lastname: 'Clausen' };
            const expected = { hello: 'Ryan Clausen' };
            const response = await request(server)
            .post('/greet')
            .send(body);

            expect(response.body).toEqual(expected);
        })
    })
})