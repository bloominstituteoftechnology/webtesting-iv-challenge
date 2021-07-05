const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('GET /', () => {
        it(`should return status code 200, JSON, and an object containing { api: 'running' }`, async () => {
            await request(server)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200, { api: 'running' });
        });
    });

    describe('POST /greet', () => {
        it('should return status code 201, JSON, and { hello: name } when name is provided inside body', async () => {
            await request(server)
                .post('/greet')
                .send({ name: 'Tanner' })
                .expect('Content-Type', /json/)
                .expect(201, { hello: 'Tanner' });
        });
    });

    describe('PUT /greet/:name', () => {
        it('should return status code 200, JSON, and { hello: name } when name is provided inside body', async () => {
            await request(server)
                .put('/greet/tanner')
                .send({ name: 'Dan' })
                .expect('Content-Type', /json/)
                .expect(200, { hello: 'Changed name from tanner to Dan' });
        });
    });

    describe('DELETE /greet/:name', () => {
        it('should return status code 200, JSON, and { removed: name }', async () => {
            const res = await request(server)
                .delete('/greet/tanner')
                .expect('Content-Type', /json/)
                .expect(200, { removed: 'tanner' });
        });
    });
});