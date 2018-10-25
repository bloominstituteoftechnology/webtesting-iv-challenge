const server = require('./api/server');
const request = require('supertest');

describe('Testing Endpoint /1234/test', () => {

    it('Should respond with JSON', async () => {
        const response = await request(server).get('/1234/test');
        expect(response.type).toBe('application/json');
    });

    it('Should respond with a status code of: 200', async () => {
        const response = await request(server).get('/1234/test');
        expect(response.status).toBe(200);
    });

    it('Should respond with a message: "DO NOT TEST ME BRO!"', async () => {
        const response = await request(server).get('/1234/test');
        expect(response.body).toBe('DO NOT TEST ME BRO!');
    });
})