const request = require('supertest');
const server = require('./server.js');


describe(`The Route Handlers`, ()=> {
      describe(`Get('/')`, () => {
         test('should return an OK status code from the index route',  async() => {
               const response = await request(server).get('/');
               expect(response.status).toBe(200);
         });

         test(`It should return a JSON object from the index route`, async () => {
              const api = {api: 'Up and running now'};
              const response = await request(server).get('/');
              expect(response.type).toMatch(/json/i);
         });

         test(`It should respond with a correct object for '/users' request`, async () => {
              const emptyArray = {"age": 39, "married": true, "name": "venky"};
              const response = await request(server).get('/users');
              expect(response.body).toEqual(emptyArray);
         });

      });
});