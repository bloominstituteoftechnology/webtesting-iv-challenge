const server = require('../server')
const request = require('supertest');

describe('server.js', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })
    describe('GET /posts', () => {
        it('should return a 200 status code', async () => {
            const response = await request(server).get('/posts')
            expect(response.status).toEqual(200);
        })
    })
    describe(`GET /posts/${id}`, () => {
        it('should return a 200 status code', async () => {
            const response = await request(server).get('/posts')
            expect(response.status).toEqual(200);
        })
        it('should return a list of posts', async () => {
            let id = 1;
            let response = await request(server).get(`/posts/${id}`)
            expect(response.data.title).toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
        })
    })

})