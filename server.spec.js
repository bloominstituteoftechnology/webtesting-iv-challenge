const server = require('./server');
const request = require('supertest');

describe('server.js', () => {
    it('should be running', () => {
        expect(true).toBeTruthy();
    });

    describe('/', () => {
        it('returns a 200 (Ok) status code', async() => {
            const response = await request(server).get('/');

            expect(response.status).toEqual(200);
        });

        it('returns a api: running', async() => {
            const expectedBody = {api: 'running'};
            const response = await request(server).get('/');

            expect(response.body).toEqual(expectedBody);
        });

        it('returns a JSON', async() => {
            const response = await request(server).get('/');
            
            expect(response.type).toEqual('application/json');
        });
    });
});