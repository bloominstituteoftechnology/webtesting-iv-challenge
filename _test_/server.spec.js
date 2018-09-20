const server = require('../server')
const request = require('supertest');

describe('server.js', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })
    describe('GET /food', () => {
        it('should return a 200 status code', async () => {
            const response = await request(server).get('/food')
            expect(response.status).toEqual(200);
        })
        it('should respond with json', async () => {
            const response = await request(server).get('/food');
            expect(response.type).toBe('application/json');
        });
        it('should return a list of food', async () => {
            const expectedBody = [
                { id: 0, name: 'Pasta'},
                { id: 1, name: 'Pizza'},
                { id: 2, name: 'Soup'}
            ]
            const response = await request(server).get('/food');
            expect(response.body).toEqual(expectedBody);
        });
    })
    describe(`POST /food`, () => {
        it('should respond with json', async () => {
            const response = await request(server).post('/food');
            expect(response.type).toBe('application/json');
        });
        it('should add new food to the list of food', async () => {
            const response = await request(server)
            .post('/food')
            .send({ name: 'Fries'});
            const expectedBody = [
                { id: 0, name: 'Pasta'},
                { id: 1, name: 'Pizza'},
                { id: 2, name: 'Soup'},
                { id: 3, name: 'Fries'},
            ];
            expect(response.body).toEqual(expectedBody);
        });
    });
    describe(`DELETE /food`, () => {
        it('should delete the specified food by ID from the list', async () => {
            const response = await request(server)
            .delete('/food/0');
            const expectedBody = [
                { id: 1, name: 'Pizza'},
                { id: 2, name: 'Soup'},
                { id: 3, name: 'Fries'},
            ];
            expect(response.body).toEqual(expectedBody);
        });
        it('should return status code 404 if the food ID is not found', async () => {
            const response = await request(server)
            .delete('/food/100');
            expect(response.status).toBe(404);
        });
    });
});