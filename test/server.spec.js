const request = require('supertest');

const server = require('../server.js');

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200', async () => {
            const expected = 200;

            const response = await request(server).get('/');

            expect(response.status).toEqual(expected);
        });
    });

    describe('GET /smurfs', () => {
        it('should return a list of smurfs', async () => {
            const expected = { id, name, age, height};
        
            const response = await request(server).get('/smurfs');

            expect(response.body).toEqual(expected);
        });

        it('should return the list as JSON', async () => {
            const response = await request(server).get('/smurfs');

            expect(response.type).toEqual('application/json');
        });
    });

    describe('PUT /smurfs/:id', () => {
        it('change smurf information', async () => {
            const response = await request(server).put()
        });
    });

    describe('POST /smurfs', () => {
        it('should add smurf into the API', async () => {
            const expected = { name, age, height };

            const response = await request(server).post(`/smurfs`).send({ name: 'smurfette', age: 2, height: 9 })
            
            expect(response.body).toEqual(expected);
        });


    });

    describe('DELETE /smurfs/:id', () => {
        it('should remove the information', async () => {
            const response = await request(server).delete()
        });
    });
});