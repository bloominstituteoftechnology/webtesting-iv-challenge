const request = require('supertest');
const server = require('./api/server');

describe('server.js', () => {
	describe('/ route', () => {
		it('should return status code 200', async () => {
			let response = await request(server).get('/');

			expect(response.status).toBe(200);
		}); // test the response

		it('should return JSON', async () => {
			let response = await request(server).get('/');

			expect(response.type).toBe('application/json');
		}); // test the payload content type
	});
});
