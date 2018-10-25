const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

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

	describe('GET /api/users', () => {
		it('should return status 200(OK)', async () => {
			const response = await request(server).get('/api/users');
			expect(response.status).toBe(200);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/api/users');
			expect(response.type).toBe('application/json');
		});

		it('should return list of all users in the db', async () => {
			const response = await request(server).get('/api/users');
			const expected = [
				{ 'id': 1, 'first_name': 'Alice', 'last_name': 'Alison' },
				{ 'id': 2, 'first_name': 'Bob', 'last_name': 'Barley' },
			];
			// expect 2 users
			expect(response.body.length).toBe(2);
			// expect an array of the users
			expect(response.body).toEqual(expected);
		});
	});

	describe('GET /api/users/:id', () => {
		describe('calling with a user id that exists', () => {
			it('should return status 200(OK)', async () => {
				const response = await request(server).get('/api/users/1');
				expect(response.status).toBe(200);
			});

			it('should return JSON', async () => {
				const response = await request(server).get('/api/users/1');
				expect(response.type).toBe('application/json');
			});

			it('should return the info of the user with the given id', async () => {
				const response = await request(server).get('/api/users/1');
				const expected = { 'id': 1, 'first_name': 'Alice', 'last_name': 'Alison' };
				// expect an object
				expect(typeof(response.body)).toBe('object');
				// expect an object with that user's info
				expect(response.body).toEqual(expected);
	
				const response2 = await request(server).get('/api/users/2');
				const expected2 = { 'id': 2, 'first_name': 'Bob', 'last_name': 'Barley' };
				// expect an object
				expect(typeof(response2.body)).toBe('object');
				// expect an object with that user's info
				expect(response2.body).toEqual(expected2);
			});
		});

		describe('calling with a user id that does not exist', () => {
			it('should return status 404(NOT FOUND)', async () => {
				const response = await request(server).get('/api/users/3');
				expect(response.status).toBe(404);
			});

			it('should return JSON', async () => {
				const response = await request(server).get('/api/users/1');
				expect(response.type).toBe('application/json');
			});

			it('should return an error message', async () => {
				const id = 3;
				const response = await request(server).get(`/api/users/${ id }`);
				const expected = { error: `No user with id ${ id } exists.`};
				// expect an object
				expect(typeof(response.body)).toBe('object');
				// expect an object with an error message
				expect(response.body).toEqual(expected);
			});
		});
	});

	describe('POST /api/users/:firstname', () => {
		// rollback, then migrate to latest and seed after each POST test
		afterEach(function(done) {
			db.migrate.rollback()
			.then(function() {
				db.migrate.latest()
				.then(function() {
					return db.seed.run()
					.then(function() {
						done();
					});
				});
			});
		});

		describe('calling with all the required credentials', () => {
			it('should return status 201(CREATED)', async () => {
				const response = await request(server).post('/api/users/testName').send({ last_name: 'testLastName' });
				expect(response.status).toBe(201);
			});
	
			it('should return JSON', async () => {
				const response = await request(server).post('/api/users/testName').send({ last_name: 'testLastName' });
				expect(response.type).toBe('application/json');
			});
	
			it('should add the given first and last name to the db and return that new user', async () => {
				const response = await request(server).post('/api/users/Carol').send({ last_name: 'Carolyn' });
				const expected = { 'id': 3, 'first_name': 'Carol', 'last_name': 'Carolyn' };
				// expect an object
				expect(typeof(response.body)).toBe('object');
				// expect an object with that new user's info
				expect(response.body).toEqual(expected);
			});
		});

		describe('calling without all the required credentials', () => {
			it('should return status 400(BAD REQUEST)', async () => {
				const response = await request(server).post('/api/users/testName');
				expect(response.status).toBe(400);
			});

			it('should return JSON', async () => {
				const response = await request(server).post('/api/users/testName');
				expect(response.type).toBe('application/json');
			});

			it('should return an error message', async () => {
				const response = await request(server).post('/api/users/testName');
				const expected = { error: 'Last name must not be missing.'};
				// expect an object
				expect(typeof(response.body)).toBe('object');
				// expect an object with an error message
				expect(response.body).toEqual(expected);
			});
		});
	});

	describe('DELETE /api/users/:id', () => {
		// rollback, then migrate to latest and seed after each DELETE test
		afterEach(function(done) {
			db.migrate.rollback()
			.then(function() {
				db.migrate.latest()
				.then(function() {
					return db.seed.run()
					.then(function() {
						done();
					});
				});
			});
		});

		describe('calling with a user id that exists', () => {
			it('should return status 200(OK)', async () => {
				const response = await request(server).delete('/api/users/1');
				expect(response.status).toBe(200);
			});
	
			it('should return JSON', async () => {
				const response = await request(server).delete('/api/users/1');
				expect(response.type).toBe('application/json');
			});
	
			it('should delete the user with the given id', async () => {
				const id = 1;
				const response = await request(server).delete(`/api/users/${ id }`);
				const expected = { message: `User with id ${ id } successfully deleted.` };
				// expect an object
				expect(typeof(response.body)).toBe('object');
				// expect an object with message stating a successful deletion
				expect(response.body).toEqual(expected);
			});
		});

		describe('calling with a user id that does not exist', () => {
			it('should return status 404(NOT FOUND)', async () => {
				const response = await request(server).delete('/api/users/3');
				expect(response.status).toBe(404);
			});

			it('should return JSON', async () => {
				const response = await request(server).delete('/api/users/3');
				expect(response.type).toBe('application/json');
			});

			it('should return an error message', async () => {
				const id = 3;
				const response = await request(server).delete(`/api/users/${ id }`);
				const expected = { error: `User with id ${ id } does not exist.` };
				// expect an object
				expect(typeof(response.body)).toBe('object');
				// expect an object with an error message
				expect(response.body).toEqual(expected);
			});
		});
	});
});
