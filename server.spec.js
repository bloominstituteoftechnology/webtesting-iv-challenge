const codes = require('./statusCodes');

const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200 OK for the GET request', async () => {
            const response = await request(server).get('/');
            expect(response.status).toEqual(codes.OK);
        });
        it('should return JSON', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/);
        });
        it('checks for the length of a single object in items table', async () => {
            const response = await request(server).get('/');
            expect(Object.keys(response.body[0]).length).toBe(2);
        });
        it('checks if the item object has an id and name property with the right data types', async () => {
            const response = await request(server).get('/');
            const item = response.body[0];
            expect(item.id).toBeDefined();
            expect(item.name).toBeDefined();

            expect(typeof item.id).toMatch("number");
            expect(item.name).toMatch(/\w/);
        });
    });
})