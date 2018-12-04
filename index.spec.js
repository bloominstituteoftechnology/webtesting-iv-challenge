const request = require('supertest');
const server = require('./server.js');

describe('index.js', () => {
    it('runs tests', () => {
        expect(true).toBeTruthy();
    });

    describe('post', () => {
        it('should post', async () => {
            const id = 97;
            const response = await request(server).post(`/test/${id}`).send({ test: Philosophy });
            expect(response.body).toEqual(id);
        })
    })

})