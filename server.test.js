const request = require('supertest');
const server = require('./server');
const Toon = require('./ToonModel');
const mongoose = require('mongoose')

const testToon = { name: 'Thrall', franchise: 'Warcraft' , password: '4thehorde' };

describe('server.js', () => {

    beforeAll(async () => {
        mongoose.connect('mongodb://localhost:27017/blizzdb');
        await Toon.remove({})
    })
    afterAll(async () => {
        Toon.remove({})
        await mongoose.disconnect();
    })

    it('should have api running with a status code of 200', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };
        const response = await request(server)
            .get('/');
        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    })

    it('should create a new Toon', async() => {
        const expectedStatusCode = 201;
        const response = await request(server)
            .post('/toons')
            .send(testToon)
        expect(response.status).toEqual(expectedStatusCode);
    })

    // it('should delete a Toon', async () => {
    //     const response = await request(server)
    //         .delete(`/toons/${req.params.id}`)
    //     expect(response.status).toEqual(200)
    // })
})
