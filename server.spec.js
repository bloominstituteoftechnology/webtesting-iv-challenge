const superTestRequest = require('supertest');

const server = require('./server');

describe('server.js', () => {
    it('should return an OK status code and a JSON object from the index route', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await superTestRequest(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    });

    it('should return all posts at route /posts', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const posts = await superTestRequest(server).get('/posts');
        
        expect(posts.status).toEqual(expectedStatusCode);
        expect(posts.type).toEqual('application/json');
        expect(posts).toEqual(expectedBody);
    })
});