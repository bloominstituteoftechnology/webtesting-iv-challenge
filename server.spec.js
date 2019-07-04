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


// describe('POST /user/:name', () => {
// 	it('should return { hello: name } when name is provided inside body ', async () => {

// 	//arrange
// 		const expected = { hello: 'Fred Flinstones' };

// 	//act
// 		const response = await request(server)
// 			.post('/greet/Fred')
// 			.send({ lastName: 'Flinstones' });

// 			//assert
// 			expect(response.body).toEqual(expected);
// 		});
// 	it('should return status code 200 Ok', async ()=> {
// 				const expected = 200;

// 				const response = await request(server).post('/greet/:name');

// 				expect(response.status).toEqual(expected);
// 			});
// 		});

	describe('POST (/users/:id)', ()=> {
			it('should return status code 200 Ok', async ()=> {
				const expected = 201;
				const response = await request(server).post('/users/:id');
				expect(response.status).toEqual(expected);
				});
			it('should add new user to list', async () => {
				const expected = {user: 'em', id: 1};
				const response = await request(server).post('/users/:id').send({user:'em', id: 1});
				expect(response.body).toEqual(expected);
			})
		});


	describe('DELETE (/users/:id)', ()=> {
			it('should return status code 200 OK', async ()=> {
				const expected = 200;
				const response = await request(server).delete('/users/:id');
				expect(response.status).toEqual(expected);
				});
			it('should delete user from list', async () => {
				const expected = {id: [0], msg: "user has been removed from list"};
				const response = await request(server).delete('/users/:id').send({id: [0], msg: "user has been removed from list"});
				expect(response.body).toEqual(expected);
			})
			});

	});
