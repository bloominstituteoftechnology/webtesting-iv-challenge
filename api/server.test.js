const request = require('supertest');
const server = require('./server');

describe('The route handlers function...', () => {

    describe('Get requests to /', () => {
        it('Responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('Responds with JSON', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });
        it('Sends the correct response object', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({api: 'up'});
        })
    });

    describe('Get requests to /api/notes', async () => {
        it('Responds with 200', async () => {
            const response = await request(server).get('/api/notes');
            expect(response.status).toBe(200);
        });
        it('Responds with JSON', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });
    });

    describe('Posts to /api/notes', () => { 
        it('Returns server code 201 on success.', async () =>{
            const body = {author: 'Marcus Aurelius', 
                text: 'When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love.'}
            const response = await request(server).post('/api/notes').send(body);
            expect(response.status).toBe(201);
        });
        it('Fails without a correct body returning server code 400.', async () => {
            const response = await request(server).post('/api/notes');
            expect(response.status).toBe(400);
        });
    });

    describe('Puts to /api/notes', () => { 
        it('Returns server code 201 on success', async () => {
            const body = {author: 'Seneca',
                text: 'Luck is what happens when preparation meets opportunity.'}
            const response = await request(server).put('/api/notes/0').send(body);
            expect(response.status).toBe(201);
        });
        test('Returns server code 400 on missing body.', async () => {
            const response = await request(server).put('/api/notes/0');
            expect(response.status).toBe(400);
        });
    });

    describe('Deletes to /api/notes/:id', () => { 
        it('Returns server code 201 on success', async () => {
            const response = await request(server).delete('/api/notes/0');
            expect(response.status).toBe(201);
        });
        test('Fails and responds with server code 404 with a wrong id.', async () => {
            const response = await request(server).delete('/api/notes/432542592402856248638035');
            expect(response.status).toBe(404);
        });
    });

});