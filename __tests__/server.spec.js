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

            it('should return a response body from the get route', async () => {
                const expected = {
                    success: true,
                    data: {
                        results: [
                            { name: 'frodo baggins' }
                        ]
                    }
                };
                const response = await request(server).get('/');

                expect(response.body).toEqual(expected);
            });

            it('should return a response type from the get route', async () => {
                const response = await request(server).get('/');

                expect(response.type).toEqual('application/json');
            });
        });

        describe('post', () => {
            it('should return an OK status code from the post route', async () => {
                const statusCode = 200;
                const response = await request(server).post('/');

                expect(response.status).toEqual(statusCode);
            });

            it('should return a response body from the post route', async () => {
                const expected = {
                    success: true,
                    data: {
                        results: [
                            { name: 'bilbo baggins' }
                        ]
                    }
                };

                const response = await request(server)
                    .post('/')
                    .send({ name: 'bilbo baggins' });
            
                expect(response.body).toEqual(expected);
            });

            it('should return a response type from the post route', async () => {
                const response = await request(server).post('/');

                expect(response.type).toEqual('application/json');
            });
        });

        describe('put', () => {
            it('should return an OK status code from the put route', async () => {
                const statusCode = 200;
                const response = await request(server).put('/people/1');

                expect(response.status).toEqual(statusCode);
            });

            it('should return a response body from the put route', async () => {
                const expected = {
                    success: true,
                    data: {
                        results: [
                            { name: 'gandalf' }
                        ]
                    }
                };

                const response = await request(server)
                    .put('/people/1')
                    .send({ name: 'gandalf' });
            
                expect(response.body).toEqual(expected);
            });

            it('should return a response type from the put route', async () => {
                const response = await request(server).put('/people/1');

                expect(response.type).toEqual('application/json');
            });
        });

        describe('delete', () => {
            it('should return an OK status code from the delete route', async () => {
                const statusCode = 200;
                const response = await request(server).put('/people/1');

                expect(response.status).toEqual(statusCode);
            });

            it('should return a response body from the delete route', async () => {
                const expected = {
                    success: true,
                    data: {
                        results: [
                            { name: 'gandalf' }
                        ]
                    }
                };

                const response = await request(server)
                    .put('/people/1')
                    .send({ name: 'gandalf' });
            
                expect(response.body).toEqual(expected);
            });

            it('should return a response type from the delete route', async () => {
                const response = await request(server).put('/people/1');

                expect(response.type).toEqual('application/json');
            });
        });
    });
});