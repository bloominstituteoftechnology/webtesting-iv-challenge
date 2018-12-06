const request = require('supertest');
const server = require('./api/server.js');

describe('Server.JS', () => {
    describe('"/" Route', () => {
        it('Return status 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200)
        })
        it('Return a json object with api : up', async () => {
            const expected = { api: 'up' };
            const result = await request(server).get('/');
            expect(result.body).toEqual(expected);
        })
    })

    describe('/create-user', () => {
        it('should return welcome user', async () => {
            let response = await request(server)
            .post('/create-user')
            .send({name : 'Drew'});
    
            expect(response.body).toEqual({ UserCreated : 'Drew' });
        });
    });
})