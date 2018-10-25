const server = require('./server.js');
const request = require('supertest');

describe('server.js', () => {
	describe('GET /', () => {
		it('should return status 200(OK)', async () => {
			const response = await request(server).get('/');
			expect(response.status).toBe(200);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/');
			expect(response.type).toBe('application/json');
		});

		it('should return the message "Server is running."', async () => {
			const response = await request(server).get('/');
			expect(response.body).toBe('Server is running.');
		});
	});
});
