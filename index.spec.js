const request = require('supertest');

const server = require('./api/server.js');


// describe('server.js', () => {
//     it('should run the tests', () => {
//         expect(true).toBeTruthy();
//     })
// })

describe('server.js', () => {
    describe('/ route', () => {
        it('should run status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        it('should return a body with this object: {api: "sanity check" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'sanity check' });
        });
    })

    describe('POST /greet endpoint', () => {
        it('should greet someone', async () => {
            let response = await request(server)
                .post('/greet')
                .send({ firstName: 'Worldy', lastName: 'McWorld' });
            expect(response.body).toEqual({ hello: 'Worldy McWorld' });
            
        })
    })
})