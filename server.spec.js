const request = require('supertest');
const server = require('./server.js');


describe('server.js', ()=> {
	describe('GET endpoint(/)', ()=> {
			it('should return status code 200 Ok', async ()=> {
				const expected = 200;

				const response = await request(server).get('/');

				expect(response.status).toEqual(expected);
				});
			});


describe('POST /greet/:name', () => {
	it('should return { hello: name } when name is provided inside body ', async () => {

	//arrange
		const expected = { hello: 'Fred Flinstones' };

	//act
		const response = await request(server)
			.post('/greet/Fred')
			.send({ lastName: 'Flinstones' });

			//assert
			expect(response.body).toEqual(expected);
		});
	it('should return status code 200 Ok', async ()=> {
				const expected = 200;

				const response = await request(server).post('/greet/:name');

				expect(response.status).toEqual(expected);
			});
	});
	});
