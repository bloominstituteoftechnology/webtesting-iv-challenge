const request = require('supertest');

const server = require('./server');

describe('testing server', async () => {
    it('should return an ok and a json object at the root route', async () => {
        const expectedBody = { api: "running" }

        const res = await request(server).get('/');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body).toEqual(expectedBody);
    })
})

// const request = require('supertest');

// const server = require('./server');

// describe('server', () => {
//   it('should return Ok and a json object from the index route', async () => {
//     const expectedBody = { api: 'running!' };

//     const response = await request(server).get('/');

//     expect(response.status).toEqual(200);
//     expect(response.type).toEqual('application/json');
//     expect(response.body).toEqual(expectedBody);
//   });
// });