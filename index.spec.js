const request = require('supertest');

const server = require('./api/server.js');


// describe('server.js', () => {
//     it('should run the tests', () => {
//         expect(true).toBeTruthy();
//     })
// })

describe('server.js', () => {
    describe('/ route', () => {
        it('should run status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
    })
})