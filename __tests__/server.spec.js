const request = require('supertest');

const server = require('../server')

describe('server.js', () => {
    describe('home endpoint', () => {
        it('should return status code 200 OK', async () => {
            const response = await request(server).get('/');

            expect(response.status).toEqual(200);
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json')
        })
    })

    describe('post endpoint', () => {
        it('should return name', async () => {
            const expected = { hello: 'flint bean'};

            const response = await request(server)
            .post('/greet/flint')
            .send({lastName: 'bean'})

            expect(response.body).toEqual(expected);
        })
    })
})

