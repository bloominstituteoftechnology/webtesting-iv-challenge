const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    describe('GET route', () => {
        it('should return 200 status code', async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return a JSON object', async () => {
            const expectedBody = { api: 'running' };
            const response = await request(server).get('/');
            expect(response.body).toEqual(expectedBody);
        });
        it('should return an object type JSON', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
        });
    });
    describe('POST route', () => {
        it('should return 201 status code', async () => {
            const expectedStatusCode = 201;
            const response = await request(server).post('/').send({ name: 'daniel' });
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return the object that was sent', async () => {
            const expectedData = { name: 'daniel' };
            const response = await request(server).post('/').send({ name: 'daniel' });
            expect(response.body).toEqual(expectedData);
        })
    });
    describe('DELETE route', () => {
        it('should return 200 status code', async () => {
            const id = 1;
            const expectedStatusCode = 200;
            const response = await request(server).delete(`/${id}`);
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return 404 status code', async () => {
            const id = 1;
            const expectedStatusCode = 404;
            const response = await request(server).delete(`/`);
            expect(response.status).toEqual(expectedStatusCode);
        });
    });
});