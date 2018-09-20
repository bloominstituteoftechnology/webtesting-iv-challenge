const request = require('supertest');
const server = require('./server.js'); 

describe('server.js', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })

    it('should return a status code of 200', async () => {
        const response = await request(server).get('/users');
            
        expect(response.status).toEqual(200); 
    })

    it('should post a user to the table "users"', async () => {
        const response = await request(server)
            .post('/users')
            .send({
                username: 'Queen Qbert',
                department: 'fruit loops',
            })
            
        expect(response.body).toEqual({added: 'Queen Qbert has been added!'}); 
    })
})