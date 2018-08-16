const request = require('supertest');

const server = require('../server')

describe('server.js', () => {
    describe('home endpoint', () => {
        it('should return status code 200 OK', async () => {
            const response = await request(server).get('/');

            expect (response.status).toEqual(200);
        });

        it('should return JSON', async () => {

        })
    })
})