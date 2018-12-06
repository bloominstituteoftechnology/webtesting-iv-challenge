const request = require('supertest');
const server = require('./server');

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

    describe('/post route', () => {
        it('should post data', async () => {
            
        });

        it('should return status 201', async () => {

        })
    });
    
})
