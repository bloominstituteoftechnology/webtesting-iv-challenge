const request = require('supertest');


const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('the route handler', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server)
            .get('/');

            expect(response.status).toBe(200);
        })

        it('responds with json', async () => {
            const response = await request(server)
            .get('/');

            expect(response.type).toMatch(/json/i);
        })

        it('sends correct response object', async () => {
            const response = await request(server)
            .get('/');

            expect(response.body).toEqual({api: 'up'});
        })
    });

    describe('get /cats', () => {



        it('responds with 200', async () => {
            const response = await request(server)
            .get('/cats');

            expect(response.status).toBe(200);
        })


        it('responds with json', async () => {
            const response = await request(server)
            .get('/cats');

            expect(response.type).toMatch(/json/i);
        })

        it('sends correct response object', async () => {
            const response = await request(server)
            .get('/cats');

            expect(response.body).toEqual([]);
        })
    })

    describe('post /cats', () => {

        afterEach(async () => {
            await db('cats').truncate();
        })

        it('responds with 201', async () => {
            const body = { name: 'negri'};
            const response = await request(server).post
            ('/cats').send(body);

            expect(response.status).toBe(201);
            
        })

        it('responds with 400 when body is missing data', async () => {
            const body = { };
            const response = await request(server).post
            ('/cats').send(body);

            expect(response.status).toBe(400);
        })

        it('responds with an array containing a new id', async () => {
            const body = { name: 'negri' };
            const response = await request(server).post
            ('/cats').send(body);

            expect(response.body.length).toBe(1);
        })
    })

});