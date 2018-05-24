const request = require('supertest');

const server = require('./server.js');

describe('/', () => {
    it('should run the server and display initial message', async () => {

        // arrange
        const expected = { api: 'running' };

        // act
        const actual = await request(server).get('/');

        // assert
        expect(actual.status).toEqual(200);
        expect(actual.type).toEqual('application/json')
        expect(actual.body).toEqual(expected);
        
    })
})