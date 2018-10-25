const request = require('supertest');

const server = require('../server.js');
const { statusObj } = require('../api/errorHandler/handlers');

describe('~~ server.js ~~', () => {
	describe('~~ GET something without a route ~~', () => {
		it('should return status 404 (not found) when browsing to "/"', async () => {
			const response = await request(server).get('/');
			expect(response.status).toBe(404);
		});

		// without async
		// it('should return status 404 (not found) when browsing to "/"', () => {
		//     return request(server).get('/').then((res) => expect(res.status).toBe(404));
		// });

		it('should return JSON', async () => {
			const response = await request(server).get('/');
			expect(response.type).toBe('application/json');
		});

		it('should return a custom JSON 404 status object when GET "/"', async () => {
			const expected = statusObj('h404', `The requested path '/' doesn't exist.`);
			const response = await request(server).get('/');
			expect(response.body).toEqual(expected);
		});
	});

	describe('~~ POST ~~', () => {
		it('should return status 201 (created) when POSTed to', async () => {
			const response = await request(server)
				.post('/api/employees')
				.send({ name: 'Vera Simon', department: 'EIT' });
			expect(response.status).toBe(201);
		});

		it('should return JSON when POSTed to', async () => {
			const response = await request(server)
				.post('/api/employees')
				.send({ name: 'Heather Simon', department: 'EPM' });
			expect(response.type).toBe('application/json');
		});

		it('should return {employeeId: 3} the third time it is POSTed to', async () => {
			const expected = { employeeId: 3 };
			const response = await request(server)
				.post('/api/employees')
				.send({ name: 'John Doe', department: '???' });
			expect(response).toEqual(expected);
		});
	});

	describe('~~ DELETE ~~', () => {
		// request(app).del('/path').end(fn)
		it('should return status 200 (OK) when DELETEd to', async () => {
			const response = await request(server).delete('/api/employees/1');
			expect(response.status).toBe(200);
		});

		it('should return JSON when DELETEd to', async () => {
			const response = await request(server).delete('/api/employees/2');
			expect(response.type).toBe('application/json');
		});

		it('should return {employeeId: 3} the third time it is DELETEd to', async () => {
			const expected = { employeeId: 3 };
			const response = await request(server).delete('/api/employees/3');
			expect(response).toEqual(expected);
		});
	});
});
