const request = require('supertest');
const server = require('./server');
const db = require('./data/config.js');
const users = require('./data/usersModel');

describe('server.js', () => {
    describe('/ route', () => {
        it('should return {API: live}', async () => {
            let response = await request(server).get('/')
            expect(response.body).toEqual({API: 'live'});
        });

        it('should return json', async () => {
            let response = await request(server).get('/')
            expect(response.type).toBe('application/json');
        });
    })

    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('create user', () => {
        it('should insert provided user', async () => {
            
            let rows = await db('users').where({ name: 'Rahul' });
            expect(rows).toHaveLength(0);
        
            await users.insert({ name: 'Rahul' });
            await users.insert({ name: 'Bobby' });
        
            rows = await db('users').where({ name: 'Rahul' });
            expect(rows).toHaveLength(1);
        
            rows = await db('users');
            expect(rows).toHaveLength(2);
        });

        it('should return correct status code', async () => {
            let response = await request(server).post('/api/users').send({name: 'Ronald'});
            expect(response.status).toBe(201);
        });

        it('should respond in JSON', async () => {
            let response = await request(server).post('/api/users').send({name: 'Ronald'});
            expect(response.type).toBe('application/json');
        });
    })

    describe('delete user', () => {
        it('should delete specified user', async () => {
            let post = await request(server).post('/api/users').send({name: 'Ronald'});
            let response = await request(server).delete('/api/users/1');
            expect(response.body).toBe(1);
        });

        it('should respond in JSON', async () => {
            let post = await request(server).post('/api/users').send({name: 'Ronald'});
            let response = await request(server).delete('/api/users/1');
            expect(response.type).toBe('application/json');
        });

        it('should return correct status code', async () => {
            let post = await request(server).post('/api/users').send({name: 'Ronald'});
            let response = await request(server).delete('/api/users/1');
            expect(response.status).toBe(200);
        });
    })
    
    
})
