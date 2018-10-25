const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
	describe('GET /', () => {
		it('should return status 200', async() => {
		const home = await request(server).get('/');
		expect(home.status).toBe(200);
		});
		it('should return default message', async()=> {
		const home = await request(server).get('/');
		expect(home.body).toEqual({message:'server running'});
		});
	});
	describe('POST /', () => {
		it('should return status 400 if no name is provided', async() => {
		const response = await request(server).post('/').send({name:''});
		expect(response.status).toBe(400);
		});
		it('should return status 200 for a request with a name', async() => {
		const response = await request(server).post('/').send({name:'david'});
		expect(response.status).toBe(200);
		});
		it('should return a message given a valid request', async() => {
		const response = await request(server).post('/').send({name:'david'});
		expect(response.body.message).toBeTruthy();
		});
	});
});