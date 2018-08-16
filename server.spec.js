const request = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('GET /users', () => {
        it('should return a 200 status code', async () => {
            const res = await request(server).get('/')
            expect(res.status).toEqual(200);
        })
        it('returned response should be type JSON', async () => {
            const res = await request(server).get('/')
            expect(res.type).toEqual('application/json');
        })
        it('should return {users: "array of users"} in response body', async () => {
            const expected = {users: 'array of users'}
            const res = await request(server).get('/')
            expect(res.body).toEqual(expected);
        })
    })

    describe('POST /users', () => {
        it('should ', async () => {
            
        })
    })

    describe('PUT /users/:id', () => {
        it('should return a 200 status code', async () => {

        })
    })

    describe('DELETE /users/:id', () => {
        it('should return a 200 status code', async () => {

        })
    })
})

