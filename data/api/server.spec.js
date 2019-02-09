const request = require('supertest');

const server = require('./server');

const db = require('../dbConfig');

describe('the route handlers', () => {
    describe('get /', () => {
        //check status code
        it('responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });
    })
    
    describe('get /hobbits', () => {
        // check status code
        it('responds with 201', async () => {
            const response = await request(server).get('/hobbits');
            expect(response.status).toBe(200);
        });

        it('sends correct response object', async () => {
            const response = await request(server).get('/hobbits');
            expect(response.body).toEqual([]);
        });
    });

    describe('post /hobbits', () => {

        afterEach(async () => {
            await db('hobbits').truncate();
        });

        it('responds with 201 when body is correct', async () => {
            const body = {name: 'shaq'};
            const response = await request(server)
                .post('/hobbits')
                .send(body);

            expect(response.status).toBe(201);
        });

        it('responds with an array containing new id', async () => {
            const body = { name: 'jimmy'};
            const response = await request(server)
                .post('/hobbits')
                .send(body);
            expect(response.body.length).toBe(1);
        });
    })


})