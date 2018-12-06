const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
    describe('should check to see if server is up', () => {
        it('check for server response status code of 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        
        it('returns JSON data', async () => {
            const response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        
        it('should check for alive message | body { message: "here we is!" }', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ message: 'here we is!' });
            
        });

    });

    describe('create user routes', () => {
        it('should add a new user to the db', async () => {
            let response = await request(server)
                .post('/api/register')
                .send({ name: 'sean', department: 'admin' });
            
            expect(response.body).toEqual({ message: `welcome to the club sean!`});
        });

        it('should return JSON data', async () => {
            const response = await request(server)
                .post('/register')
                .send({ name: 'sean', department: 'admin' });
            
            expect(response.type).toBe('text/html');
        })
    });

    // describe('delete user routes', () => {
    //     it('should be able to find a user in the database', async () => {

    //     })
    // });
})