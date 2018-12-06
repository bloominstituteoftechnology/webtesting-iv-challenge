const request = require('supertest');
const server = require('./api/server.js');

describe('index.js', () => {
    it('should be on and crackin', () => {
        expect(true).toBeTruthy();
    });
})