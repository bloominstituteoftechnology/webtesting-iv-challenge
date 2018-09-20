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
})