const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
    describe('index route', () => {
        describe('get', () => {
            it('should return an OK status code from the get route', async () => {
                // option config
                // 0 = async/await
                // 1 = promises
                let option = 0;
                const statusCode = 200;

                if(option === 1) {
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

            it('should return a response body from the index route', async () => {
                const expectedBody = { api: 'running' };
                const response = await request(server).get('/');

                expect(response.body).toEqual(expectedBody);
            });

            it('should return a response type from the index route', async () => {
                const response = await request(server).get('/');

                expect(response.type).toEqual('application/json');
            });
        });

        describe('post', () => {
            it('should return an OK status code from the post route', async () => {
                const statusCode = 200;
                const response = await request(server)
                    .post('/')
                    .send({ first: 'frodo', last: 'baggins' });

                expect(response.status).toEqual(statusCode);
            });

            it('should return object when request body provided', async () => {
                const expected = { hello: 'frodo baggins' };

                const response = await request(server)
                    .post('/greet/frodo')
                    .send({ lastName: 'baggins' });
            
                expect(response.body).toEqual(expected);
            });
        });

        describe('put', () => {

        });

        describe('delete', () => {

        });
    });
});