const request = require('supertest');

const server = require('../api/server.js')

describe('server.js', () => {
    describe('/ route', async () => {
        test('returns status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        test('returns JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        test('returns body { api: "up" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        });
    });
});


  
    //   it('should return with a body like: { api: "up" }', async () => {
    //     let response = await request(server).get('/');
  
    //     expect(response.body).toEqual({ api: 'up' });
    //   });
    // });
  
    // describe('POST /greet endpoint', () => {
    //   it('should greet the person', async () => {
    //     let response = await request(server)
    //       .post('/greet')
    //       .send({ firstName: 'Ryan', lastName: 'Clausen' });
  
    //     expect(response.body).toEqual({ hello: 'Ryan Clausen' });
  
    //     response = await request(server)
    //       .post('/greet')
    //       .send({ firstName: 'Brian', lastName: 'Williams' });
    //     expect(response.body).toEqual({ hello: 'Brian Williams' });
    //   });
//     });
//   });
  