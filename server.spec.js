const request = require('supertest');
const server = require('./server');
 describe('server', () => {
    describe('GET /users', () => {
        it('should return a 200 status code', async () => {
            const res = await request(server).get('/users')
            expect(res.status).toEqual(200);
        })
        
    })


})