const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
	it('run all the tests', () => {
		expect(true).toBeTruthy();
	});

	describe('GET /', () => {
		it('returns a 200(OK) status code', async () => {
			// get access to the server
			// use supertest to make a GET to the server
			const response = await request(server).get('/');

			expect(response.status).toEqual(200);
		});

		it('it should return {api: "running"}', async () => {
			const expectedBody = { api: 'running' };
			const response = await request(server).get('/');

			expect(response.body).toEqual(expectedBody);		
		});
	});

	describe('/hello', () => {
		it('should return JSON', async () => {
		const response = await request(server).get('/hello');

		expect(response.type).toEqual('application/json');
		});
	});

	describe('POST to /greet/:name', () => {
		it('should greet the person', async () => {
			let name = 'kyle';
			let last = 'meltzer';
			// make a post passing last name in the body
			// and first name as a url parameter
			let response = await request(server)
				.post(`/greet/${ name }`)
				.send({ last });
			// verify that the endpoint returns the right object
			expect(response.body).toEqual({ hello: 'kyle meltzer' });

			name = 'fernando';
			last = 'salazar';
			response = await request(server)
				.post(`/greet/${ name }`)
				.send({ last });

			expect(response.body).toEqual({ hello: 'fernando salazar' });
		});
	});

	describe('DELETE /', () => {
		it('returns a 201 status code', async () => {
			const response = await request(server).delete("/1");
			expect(response.status).toEqual(201);
		});

		it('returns a count of the objects deleted, which will be 1', async () => {
			const response = await request(server).delete("/1");
			expect(response.body).toEqual(1);
		});
	});
});