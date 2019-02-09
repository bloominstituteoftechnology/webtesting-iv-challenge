const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');

afterEach(async () => {
    await db('users').truncate();
})

describe('GET tests', () => {
    test('has status code 200', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toBe(200);
    });
});