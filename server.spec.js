const request = require('supertest');

const server = require('./server');

describe('Server', () => {
    it('Should return ok and a json object from the index route', async () => {
        //arrange
        const expectBody = { msg: 'Server is working' };

        //act
        // const response = request(server).get('/').then(res => );
        const response = await request(server).get('/');
        // assert
        expect(response.status).toEqual(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectBody);
    })
})