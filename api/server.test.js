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
        it('Proper Posts requests to /api/notes returns status code 201', async () =>{
            const body = {author: 'Marcus Aurelius', 
                text: 'When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love.'}
            const response = await request(server).post('/api/notes').send(body);
            expect(response.status).toBe(201);
        });
        test('Post requests to /api/notes without a correct body fail.', async () => {
            const response = await request(server).post('/api/notes');
        });
    });

    describe('Puts to /api/notes', () => { 
        it('Puts requests to /api/notes/:id', async () => {
            const body = {author: 'Seneca',
                text: 'Luck is what happens when preparation meets opportunity.'}
            const response = await request(server).puts('/api/notes/0').send(body);
        });
        test('Puts requests to /api/notes/:id without a correct body fail.', async () => {
            const response = await request(server).puts('/api/notes/0');

        });
    });

    describe('Deletes to /api/notes', () => { 
        it('Deletes requests to /api/notes/:id', async () => {
            const response = await request(server).delete('/api/notes/0');
        });
        test('Delete requests to /api/notes/:id without a correct id fail.', async () => {
            const response = await request(server).delete('/api/notes/432542592402856248638035');
        });
    });

});