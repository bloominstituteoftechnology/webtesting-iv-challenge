const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('The route handlers', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server).get('/');

            expect(response.type).toMatch(/json/i);
        });
    });

    describe('post /character', () => {

        afterEach(async () => {
            await db('characters').truncate();
        });

        it('responds with 201 if body is correct', async () => {
            const body = {name: 'David'}
            const response = await request(server).post('/character').send(body);

            expect(response.status).toBe(201);
            db('characters').truncate();
        });

        it('responds with 400 when body is missing data', async () => {
            const body = { }
            const response = await request(server).post('/character').send(body);
           
            expect(response.status).toBe(400)
            db('character').truncate();
        })
    });

    describe('delete /character', () => {

        afterEach(async () => {
            await db('characters').truncate();
        });

        it('responds with 200 if body is correct and character is deleted', async () => {
            const add = {name: 'Bob'}
            const addResponse = await request(server).post('/character').send(add);

            if(addResponse.status === 201) {
                const body = {name: 'Bob'}
                const response = await request(server).delete('/character').send(body);

                expect(response.status).toBe(200);
                db('characters').truncate();
            }
        });

        it('responds with 404 if character doesn\'t exist', async () => {
            const body = {name: 'Richard'}
            const response = await request(server).delete('/character').send(body);

            expect(response.status).toBe(404);
            db('characters').truncate();
        });

        it('responds with 400 when body is missing data', async () => {
            const body = {}
            const response = await request(server).delete('/character').send(body);

            expect(response.status).toBe(400);
            db('characters').truncate();
        });
    });
});