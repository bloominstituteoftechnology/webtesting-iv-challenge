const request = require('supertest');

const server = require('./server.js');

describe('server', () => {

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

    // describe('/post', () => {
    //     it('should run the server and display initial message', async () => {

    //         // arrange
    //         const expected = { api: 'running' };

    //         // act
    //         const actual = await request(server).get('/');

    //         // assert
    //         expect(actual.status).toEqual(200);
    //         expect(actual.type).toEqual('application/json')
    //         expect(actual.body).toEqual(expected);
            
    //     })
    // })



})