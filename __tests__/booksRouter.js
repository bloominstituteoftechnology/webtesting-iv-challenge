const request = require('supertest');

const server = require('../api/server.js');

const db = require('../data/dbConfig.js');

// removes all records from database and runs seeds
beforeEach(async () => {
    await db('books').truncate();
    await db.seed.run();
    // await db('books').insert({
    //     id: 1,
    //     title: 'The Road',
    //     author: 'Cormac McCarthy',
    //     isbn: '9780307387899'
    // });
});

describe('booksRouter.js', () => {
    describe('/api/books endpoint', () => {
        it('[GET] - should return array if database is not empty', async () => {
            let response = await request(server).get('/api/books');
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('[POST] - should return array with object being posted', async () => {
            const newBook = { 
                title: 'A Lesson Before Dying',
                author: 'Ernest J. Gaines',
                isbn: '9780375702709'
            }
            let response = await request(server).post('/api/books').send(newBook);
            expect(response.body).toEqual([Object.assign(newBook, {id: 2})]);
        });
    });

    describe('/api/books/:id endpoint', () => {
        it('[GET] - should return 200 for id that exists', async () => {
            let response = await request(server).get('/api/books/1');
            expect(response.status).toBe(200);
        });

        it('[GET] - should return 404 for id that does not exist', async () => {
            let response = await request(server).get('/api/books/2');
            expect(response.status).toBe(404);
        });

        it('[DELETE] - should return 200 for successfully deleted book', async () => {
            let response = await request(server).delete('/api/books/1');
            expect(response.status).toBe(200);
        });

        it('[DELETE] - should return 404 for attempting to delete id that does not exist', async () => {
            let response = await request(server).delete('/api/books/2');
            expect(response.status).toBe(404);
        });

        // it('should return json object', async () => {
        //     let response = await request(server).get('/');
        //     expect(response.type).toBe('application/json');
        // });

        // it('should return {api: \'running\'}', async () => {
        //     let response = await request(server).get('/');
        //     expect(response.body).toEqual({api: 'running'});
        // });
    });
});