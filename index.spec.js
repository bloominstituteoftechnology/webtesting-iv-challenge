const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
    describe('GET /', () => {
	it('should return status code 200(OK)', async () => {
	    const response = await request(server).get('/');
	    expect(response.status).toBe(200);
	});

	it('should return JSON', async () => {
	    const response = await request(server).get('/');
	    expect(response.type).toBe('application/json');
	});

	it('should return { message: "server running" }', async () => {
	    const response = await request(server).get('/');
	    expect(response.body).toEqual({ message: 'server running' });
	});
    });

    describe('POST /hello/:name', () => {
	it('should state the name', async () => {
	    const name = 'A';
	    const lastName = 'B';
	    const expected = { hello: 'A B' };
	    const response = await request(server)
		  .post(`/hello/${name}`)
		  .send({ lastName });
	    expect(response.body).toEqual(expected);
	});

	it('should add person to the Doe family if no last name provided', async () => {
	    const name = 'A';
	    const expected = { hello: 'A Doe' };
	    const response = await request(server)
		  .post(`/hello/${name}`);
	    expect(response.body).toEqual(expected);
	});
    });

    // describe('PUT /hello/:name', () => {
    // 	it('should change the name', async () => {
    // 	    const name = 'John';
    // 	    const lastName = 'Paul';
    // 	    const expected = { message: 'John Paul' };
    // 	    const response = await request(server)
    // 		  .put(`/hello/${name}`)
    // 		  .send({ lastName });
    // 	    expect(response.body).toEqual(expected);
    // 	});
    // });
    
    it('can run more tets', () => {
	expect(false).toBeFalsy();
    });

    it('can run even more tets', () => {
	expect(false).toBeFalsy();
    });
});
