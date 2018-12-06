const request = require('supertest');
const server = require('./server');

describe('server.js', () => {

    describe('/get', () => {
        it('should return status code 200', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        });

        it('should return json', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });

        it('should return { api: "up"}', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        });
    });

    describe('post request to /api/books', () => {
        it('should return status code 200 if the post is successful', async () => {
            const title = 'The Odyssey';
            const response = await request(server).post('/api/books').send({ title })
            expect(response.status).toBe(200);
        });

        it('should return the object when given the same object', async () => {
            const title = 'My Side of the Mountain';
            const response = await request(server).post('/api/books').send({title})
            expect(response.body).toEqual({title});
        })

        it('should return a 400 error if a title is not given', async () => {
            const title = null;
            const response = await request(server).post('/api/books').send({title})
            expect(response.status).toBe(400);
        })

    })
})