const request = require('supertest');

const server = require('./api/serverframework.js');

describe('server.js', () => {
   describe('/ route', ()=> {
       it('should return status code 200', async ()=> {
           // hit the endpoint and get the response
            const response = await request(server).get('/');
            expect(response.status).toBe(200);

       });

       it('should return JSON', async ()=> {
           let response = await request(server).get('/');
           expect(response.type).toBe('application/json');
       })

       it('should return with a body like: {api: "up"}', async ()=> {
           const expected = { api: "up"};
           let response = await request(server).get('/');
           expect(response.body).toEqual(expected);
       })

       describe('/greet endpoint', ()=> {
           it('should greet the person', async ()=> {
               let response = await request(server)
                  .post('/greet')
                  .send({ firstName: 'Toua', lastName: 'Xiong'})
                expect(response.body).toEqual({ hello: 'Toua Xiong'})

                response = await request(server)
                  .post('/greet')
                  .send({ firstName: 'Lambda', lastName: 'School'})
                expect(response.body).toEqual({ hello: 'Lambda School'});
           })
       })
   })
})