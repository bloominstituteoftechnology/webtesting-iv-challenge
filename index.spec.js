const request = require('supertest');
const server = require('./api/server');

describe("Test the root path", () => {
    it('should return status code 200', async () => {
        let response = await request(server).get('/');
        expect(response.status).toBe(200);
    })

    describe('POST /create', () => {
        it('should return status code 201', async () => {
            let response = await request(server).post('/create')
            expect(response.status).toBe(201);
        })
    })
})