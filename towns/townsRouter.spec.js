const request = require('supertest');
const server = require('./townsRouter.js')

describe('server.js', () => {
    describe('/towns', async () => {
        it('create town with correct response 201', async () => {
            let response = await request(server)
            .post('/towns')
            .send({ name: 'down'});
            expect(response.status).toBe(201);
        })

        it('create should return 400 for failed test', async () => {
            let response = await request(server)
            .post('/towns')
            .send({ nam: 'down'});
            expect(response.status).toBe(400);
        })

        it('delete town with correct response 200', async () => {
            let response = await request(server)
            .delete('/towns')
            .send({ name : 'down' });
            expect(response.status).toBe(200);
        })

       it('delete should return 404 for failed test', async () => {
            let response = await request(server)
            .delete('/towns')
            .send({ direction: 'up' });
            expect(response.status).toBe(404);
        })

    })
})