const request = require('supertest');
const db = require('./data/dbConfig.js');
const server = require('./api/server.js');
const users = require('./data/usersModel');

describe('server.js', () => { 

    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
             expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });

    });

    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('/create users', () => {
        it('should insert the given user', async () => {
            let rows = await db('users').where({ name: 'Savannah'});
            expect(rows).toHaveLength(0);

            await users.insert({ name: 'Savannah' });
            await users.insert({ name: 'Serenna' });

            rows = await db('users').where({ name: 'Savannah'});
            expect(rows).toHaveLength(1);

            rows = await db('users');
            expect(rows).toHaveLength(2);   
        });

        it('should return correct status code after adding user successfully', async () => {
            let response = await request(server).post('/api/users').send({name: 'Tai'});
            expect(response.status).toBe(201);
        });
    })

    describe('delete user', () => {
        it('should delete specified user', async () => {
            let post = await request(server).post('/api/users').send({name: 'Tai'});
            let response = await request(server).delete('/api/users/1');
            expect(response.body).toBe(1);
        });
        it('should return correct status code', async () => {
           let response = await request(server).delete('/api/users/1');
            expect(response.status).toBe(200);
        });
    })

});
