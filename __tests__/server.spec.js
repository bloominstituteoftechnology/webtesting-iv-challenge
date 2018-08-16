const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status code from the index route', async () => {
            // option config
            // 0 = async/await
            // 1 = promises
            let option = 0;
            const statusCode = 200;

            if(option) {
                let response;
                return request(server).get('/').then(res => {
                    response = res;

                    expect(response.status).toEqual(statusCode);
                });
            } else {
                const response = await request(server).get('/');

                expect(response.status).toEqual(statusCode);
            }
        });

        it('should return a JSON object from the index route', async () => {
            const expectedBody = { api: 'running' };
            const response = await request(server).get('/');

            expect(response.body).toEqual(expectedBody);
        });

        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json');
        });
    });
});