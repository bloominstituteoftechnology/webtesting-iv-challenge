const server = require('./server'); 
const request = require('supertest'); 

// GET Request Tests 
// should return a status code of 200
// check for the response body? 
// the type of the response should be JSON


describe('Server', () => {
    describe('GET to /', () => {
        it('should return a status code of 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toEqual(200);
        });

        it('should return a response body', async () => {
            const expectedBody = {
                users: [
                    {id: 1, name: 'Mike', email: 'mike@test.com'},
                    {id: 2, name: 'Katia', email: 'katia@test.com'},
                    {id: 3, name: 'Grant', email: 'grant@test.com'}
                ]
            };

            const response = await request(server).get('/');
            expect(response.body).toEqual(expectedBody);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });
    });
    
});

//POST Request Tests 
//should return a status code of 201
//should return posted data in the response body
// it should  return a JSON  response 

//DELETE Request Tests 
//should return a status code of 200 when the user is deleted
//should return the id of the deleted item 
//should make sure it is a JSON response 

//PUT Request Tests
//should return a status code of 201 when a user is updated
//should return the id of the updated item
//should make sure it is a JSON response 


