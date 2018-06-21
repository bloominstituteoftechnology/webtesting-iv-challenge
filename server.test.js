const request = require('supertest');
const server = require('./server');
const Toon = require('./ToonModel');
const mongoose = require('mongoose')

describe('server.js', () => {
    // beforeAll(() => {
    //     return mongoose.connect('mongodb://localhost:27017/blizzdb')
    // })
    // afterEach(() => {
    //     return Toon.remove();
    // })
    // afterAll(() => {
    //     return mongoose.disconnect();
    // })
    it('should have api running with a status code of 200', async() => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    })
    // it('should create a new Toon', (done) => {
    //     const expectedStatusCode = 201;

    //     const deckard = { name: 'Deckard', franchise: 'Diablo' , password: 'barb' };
    //     //const newToon = await Toon.create(deckard)

    //     const response = request(server).post('/toons')
    //     .send(deckard)      
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .end(function(err, res) {
    //         if(err) return done(err)
    //         done()
    //     })  

    //     expect(response.status).toEqual(expectedStatusCode);
    // })
    // it('should delete a Toon', async() => {
    //     const expectedStatusCode = 200;
        
    //     const response = await request(server).delete('/toon')
    // })
})
