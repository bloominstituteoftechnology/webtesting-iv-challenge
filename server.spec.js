const request = require('supertest');
const knex = require('knex');

const server = require('./server');

describe('server', () => {
	describe('POST /testserver', () => {
		beforeEach(() => {
			// reset database here
		});

		it('should add thing to the database', async () => {
			const thing = 'thing';
			const expected = { message: `${thing} added with id 1` };

			const response = await request(server)
				.post(`/testserver`)
				.send({ thing });

			expect(response.body).toEqual(expected);
		});

		it('should return an error when thing already exists', async () => {
			const thing = 'thing';
			const expected = { error: `${thing} already exists` };

			const response = await request(server)
				.post(`/testserver`)
				.send({ thing });

			expect(response.body).toEqual(expected);
		});

		it('should return 201 status code after adding thing', async () => {
			const thing = 'thing2';
			const expected = 201;

			const response = await request(server)
				.post(`/testserver`)
				.send({ thing });

			expect(response.status).toEqual(expected);
		});

		it('should return 409 status code when thing already exists', async () => {
			const thing = 'thing2';
			const expected = 409;

			const response = await request(server)
				.post(`/testserver`)
				.send({ thing });

			expect(response.status).toEqual(expected);
		});
	});

	describe('DELETE /testserver', () => {
		beforeEach(() => {
			// reset database here
		});

		it('should delete thing with id from the database', async () => {
			const id = 3;
			const expected = { message: `thing with id ${id} deleted` };

			const response = await request(server).delete(`/testserver/${id}`);

			expect(response.body).toEqual(expected);
		});

		it("should return an error when thing with id doesn't exist", async () => {
			const id = 3;
			const expected = { error: `no thing with id ${id} to delete` };

			const response = await request(server).delete(`/testserver/${id}`);

			expect(response.body).toEqual(expected);
		});

		it('should return 200 status code after deleting thing with id', async () => {
			const id = 4;
			const expected = 200;

			const response = await request(server).delete(`/testserver/${id}`);

			expect(response.status).toEqual(expected);
		});

		it("should return 404 status code when thing with id doesn't exist", async () => {
			const id = 4;
			const expected = 404;

			const response = await request(server).delete(`/testserver/${id}`);

			expect(response.status).toEqual(expected);
		});
	});
});
