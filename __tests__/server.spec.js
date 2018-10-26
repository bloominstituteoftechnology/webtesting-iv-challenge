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

	describe('~~ GET /api/employees pt1', () => {
		it('should return status 204 when there are no employees in memory', async () => {
			const response = await request(server).get('/api/employees');
			expect(response.status).toBe(204);
		});
	});

	describe('~~ POST /api/employees ~~', () => {
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
			expect(response.body).toEqual(expected);
		});

		it('should return status 400 custom JSON if one or more properties are missing from the POST', async () => {
			const expected = statusObj('h400', `Missing name or department property.`);
			const response = await request(server)
				.post('/api/employees')
				.send({ name: 'Braden' });
			expect(response.body).toEqual(expected);
		});
	});

	describe('~~ GET /api/employees pt2 ~~', () => {
		it('should return status 200 (OK) when browsing to "/api/employees"', async () => {
			const response = await request(server).get('/api/employees');
			expect(response.status).toBe(200);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/api/employees');
			expect(response.type).toBe('application/json');
		});

		it('should return an array of employee objects when GET "/api/employees"', async () => {
			const expected = [
				{
					id: 1,
					name: 'Vera Simon',
					department: 'EIT'
				},
				{
					id: 2,
					name: 'Heather Simon',
					department: 'EPM'
				},
				{
					id: 3,
					name: 'John Doe',
					department: '???'
				}
			];
			const response = await request(server).get('/api/employees');
			expect(response.body).toEqual(expected);
		});
	});

	describe('~~ PUT /api/employees/:id ~~', () => {
		it('should return status 200 (created) when PUTed to', async () => {
			const response = await request(server)
				.put('/api/employees/1')
				.send({ name: 'Vera Simon', department: 'DEV' });
			expect(response.status).toBe(200);
		});

		it('should return JSON when PUTed to', async () => {
			const response = await request(server)
				.put('/api/employees/2')
				.send({ name: 'Heather Simon', department: 'CTO' });
			expect(response.type).toBe('application/json');
		});

		it('should return {employeeId: 3} the third time it is POSTed to', async () => {
			const expected = { id: 3, name: 'John Doe', department: 'Helpdesk' };
			const response = await request(server)
				.put('/api/employees/3')
				.send({ name: 'John Doe', department: 'Helpdesk' });
			expect(response.body).toEqual(expected);
		});

		it('should return status 400 custom JSON if one or more properties are missing from the POST', async () => {
			const expected = statusObj('h400', 'Missing name or department property.');
			const response = await request(server)
				.put('/api/employees/3')
				.send({ name: 'Braden' });
			expect(response.body).toEqual(expected);
		});
	});

	describe('~~ DELETE /api/employees/:id ~~', () => {
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
			expect(response.body).toEqual(expected);
		});

		it("should return status 404 custom JSON if employee ID doesn't exist", async () => {
			const expected = statusObj('h404', `Employee with ID '7' doesn't exist.`);
			const response = await request(server).delete('/api/employees/7');
			expect(response.body).toEqual(expected);
		});
	});
});
