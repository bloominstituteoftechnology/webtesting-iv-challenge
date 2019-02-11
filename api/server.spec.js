const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

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

      describe(`Post('/)`, () => {
          afterEach( async () => {          
              await db('users').truncate(); 
            });

            test('It should response with a success code 201 when we create a user', async () => {
                const user = {name:'venky', age:'30', married:true};
                const response = await request(server).post('/users').send(user);
                expect(response.status).toBe(201);
           });

           test(`It should respond with a 422 error code where there is no name`, async () => {
                 const user = { name: '', age:'38', married:true};
                 const response = await request(server).post('/users').send(user);
                 expect(response.status).toBe(422);
           });

           test(`It should respond with a 422 error code where there is no age details`, async () => {
            const user = { name: 'sam', age:'', married: true};
            const response = await request(server).post('/users').send(user);
            expect(response.status).toBe(422);
           });

           test(`It should respond with a 422 error code where there is no marriage details`, async () => {
            const user = { name: 'yaat', age:'32', married: ''};
            const response = await request(server).post('/users').send(user);
            expect(response.status).toBe(422);
           });

           test.skip(`It should respond with array containing a new array`, async () => {
                const user = {name: 'samuel-ire', age:'22', married:false};
                const response = await request(server).post('/users').send(user);
                expect(response.body).toBeDefined();

           })
      });

      describe(`DELETE /users/:id endpoint`, () => {
              test(`It should respond with 200 success code when deleted the user`, async () => {
                   const id = 1;
                   const response = await request(server).delete('/users/:id');
                   expect(response.status).toBe(200);
              });

              test(`It should respond with a json`, async () => {
                    const response = await request(server).delete('/users/id');
                    expect(response.type).toEqual('application/json');
              });

              test(`It should respond with a 404 error code if there is no id`, async () => {
                    const id = 10;
                    const response = await request(server).delete('/users/:id');
                    expect(response.status).toBe(404);
              });
      });
});