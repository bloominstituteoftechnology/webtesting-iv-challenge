const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200 OK', async () => {
            const expected = 200;

            const response = await request(server).get('/');

            expect(response.status).toEqual(expected);
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json');
        });
    });

    describe('POST /user', () => {

        it('should return status code 201 OK', async () => {
            const expected = 200;
            const response = await request(server).post('/user').send({ name: 'ant' });
            expect(response.status).toEqual(expected);
        });

        it('should return { hello: name } when new user is created', async () => {
            const expected = { hello: 'ant' };
            const response = await request(server).post('/user').send({ name: 'ant' });
            expect(response.body).toEqual(expected);
        });
    });

    describe('DELETE /user/:id', () => {
        it('should return status code 200', async () => {
            const expected = 200;
            const response = await request(server).delete('/user/5').send({ id: '5' });
            expect(response.status).toEqual(expected);
        });
        it('should return JSON', async () => {
            const expected = { deleted: '5' };
            const response = await request(server).delete('/user/5').send({ id: '5' });
            expect(response.body).toEqual(expected);
        });
    });
});
