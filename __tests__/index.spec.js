const request = require('supertest');
const server = require('../index.js');

describe('basic API functionality tests', () => {
  describe('tests for GET command', () => {

    test('should return a list of users and check response', async () => {
      const response = await request(server).get('/api/users');
      expect((response.body.message)).toBe('Here are the requested users.');
    });
  });

  describe('tests for POST command', () => {
    test('should post user successfully and return correct response', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({ username: "XXXXXXX", age: 100, department: "XXXXXXX" });
        expect((response.body.message)).toBe('User successfully added to database.');
    });
  });

  describe('tests for DELETE command', () => {
    test('should successfully delete user and return correct response', async () => {
      const response = await request(server).delete('/api/users/6');
      expect((response.body.message)).toBe('User deleted successfully.');
    });
  });

  describe('tests for updating', () => {
    test('should update the user and return correct response', async () => {
      const response = await request(server).put('/api/users/3').send({username: "update", age: 1, department: "did this work?"});
      expect((response.body.message)).toBe('User updated successfully.');
    });
  });

});
