const request = require('supertest');
const server = require('./api/server.js');

describe('server', () => {
    describe('post', () => {
        it('should post and return id', async () => {
            const id = 5;
            const response = await request(server).post(`/api/${id}`).send({ food: 'eggs' });
            expect(response.body).toEqual(id);
        })
    })

    describe('put', () => {
        it('should delete and return deleted id', async () => {
            const id = 5;
            const response = await request(server).post(`/api/${id}`).send({ food: 'eggs' });
            expect(response.body).toEqual(id);
        })
    })
})