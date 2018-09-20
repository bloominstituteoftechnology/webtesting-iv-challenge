const request = require('supertest');
const server = require('./server');

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