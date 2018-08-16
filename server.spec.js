const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('GET', () => {
        it('should return status code 200', async () => {
            const res = await request(server).get('/');
            expect(res.status).toEqual(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toEqual('application/json');
        });

        it(`should return an object containing { api: 'running' } `, async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'running' });
        });
    });

    describe('POST /greet', () => {
        it('should return status code 200', async () => {
            const res = await request(server)
                .post('/greet')
                .send({ name: 'Tanner' });

            expect(res.status).toEqual(200);
        });

        it('should return JSON', async () => {
            const res = await request(server)
                .post('/greet')
                .send({ name: 'Tanner' });

            expect(res.type).toEqual('application/json');
        });

        it(`should return { hello: name } when name is provided inside body`, async () => {
            const expected = { hello: 'Tanner' };
            const res = await request(server)
                .post('/greet')
                .send({ name: 'Tanner' });

            expect(res.body).toEqual(expected);
        });
    });
});