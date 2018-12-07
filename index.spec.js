const request = require('supertest');
const knex = require('knex');
const knexConfig = require('./knexfile');
const server = require('./api/server');

const db = knex(knexConfig.development);

beforeEach(async () => {
    await db('users').truncate();
});

describe('server.js', () => {

    describe('GET / ', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/'); // supertest makes the call!
            expect(response.status).toBe(200); // jest makes the comparison
        })
    }); 

    describe('POST /createUser', () => {
        it('should return status 201', async () => {
            const response = await request(server).post('/createUser').send({ name: 'Ned' });
            expect(response.status).toBe(201);
        });

        it('should return an object', async () => {
            const response = await request(server).post('/createUser').send({ name: 'Ned' });
            expect(response).toBeTruthy();
        });
    });

    describe('DELETE /deleteUser/:id', () => {
        it('should return status 200', async () => {
            const response = await request(server).del('/deleteUser').send({ name: 'Ned' });
            expect(response.status).toBe(200);
        });

        // it('should return an object', async () => {
        //     const response = await request(server).post('/createUser').send({ name: 'Ned' });
        //     expect(response)
        // });
    });

});