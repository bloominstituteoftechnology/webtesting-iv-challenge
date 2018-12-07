const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

beforeEach(async () => {
    await db('books').truncate();
})

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
            const {title} = 'My Side of the Mountain';
            const response = await request(server).post('/api/books').send({title})
            expect(response.body).toEqual({message: 'successfully posted book title'});
        });

        it('should return json', async () => {
            const {title} = 'Slaughterhouse Five';
            const response = await request(server).post('/api/books').send({title})
            expect(response.type).toBe('application/json');
        });
    });

    describe('delete request to /api/books/:id', () => {
        it('should return a status code 200 if the delete is successful', async () => {
            const post = await request(server).post('/api/books').send({title: 'War and Peace'});
            const response = await request(server).delete('/api/books/1');
            expect(response.status).toBe(200);
        });

        it('should return json', async () => {
            const post = await request(server).post('/api/books').send({title: 'War and Peace'});
            const response = await request(server).delete(`/api/books/1`)
            expect(response.type).toBe('application/json');
        });

        it('should return a 404 error if an id is not given', async () => {
            const post = await request(server).post('/api/books').send({title: 'War and Peace'});
            const response = await request(server).delete(`/api/books`)
            expect(response.status).toBe(404);
        });
    
    })
})