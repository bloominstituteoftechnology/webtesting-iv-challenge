const request = require('supertest');

const server = require('./api/server.js');

//TEST  FOR Server.js '/'
describe('server.js', () => {

    //TEST  FOR BASIC GET--ROUTE '/'
    describe('/ route', () => {
            it('should return status code 200', async () => {
                let response = await request(server).get('/');
                expect(response.status).toBe(200);
            })

            it('should get response in JSON format..', () => {
                request(server)
                     .get('/')
                     .then(response => {
                           expect(response.type).toBe('application/json')    
                      })    
            })

            it('should return with a body like: {Message:  "SERVER  RUNNING."', async () => {
                let response = await request(server).get('/');
                expect(response.body).toEqual({Message:  'SERVER  RUNNING.'});
            });
    })

    //TEST FOR CREATE  POST-ROUTE '/greet'
    describe('POST /greet endpoint', () => {
        it('should greet the person', async () => {
            let response = await request(server)
                                       .post('/greet')
                                       .send({ firstName : "ABC", lastName : "XYZ"});    
            expect(response.body).toEqual({Hello : "ABC XYZ"});
        })

        it('should get response in JSON format..', () => {
            request(server)
                 .post('/greet')
                 .then(response => {
                       expect(response.type).toBe('application/json')    
                  })    
        })

        /*it('POST /greet should return 400 status code if no body is sent', async () => {
                const response = await request(server).post('/greet');
                expect(response.status).toEqual(400);
        });*/
    });

});