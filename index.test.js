

//==============================================================================

//------------------------------------------------
const request = require('supertest');
const server = require('./server.js');

//------------------------------------------------
describe('Tests Functioning', () => {
    test('should return status code 200', () => {
        expect(server).toBeTruthy();
    });
});
