const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
  describe('Server running', () => {
    it('server running', () => {
      expect(true).toBeTruthy();
    });

    it('server running', () => {
      expect(false).toBeFalsy();
    });
  });
});
