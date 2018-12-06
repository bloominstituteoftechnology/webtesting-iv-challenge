const request = require('supertest');
const server = require('./api/server');

describe('server', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200)
        })
        it('should return body of {api: "running"}', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({api: "running"})
        })
    })

    describe('POST /users route', () => {
        it('should welcome new user', async () => {
            let response = await request(server)
            .post('/users')
            .send({firstName: 'Pedro', lastName: 'Montesinos'})
            expect(response.body).toEqual({welcome:'Pedro Montesinos'});
        })
    })


    describe('DELETE /users/:id route', () => {
        it('should delete a user', async () => {
            const id = 1;
            const response = await request(server).delete(`/users:${id}`);
            expect(response.body).toEqual({deletedUser: `${id}`});
        })
        it('should return status code 200', async () => {
            const id = 1;
            const response = await request(server).delete(`/users/${id}`);
            expect(response.status).toBe(200);
        })
    })
})