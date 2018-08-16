const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {

describe('server testing for get request', () => {

it('should return status code 200 OK', async() => {
		const expected =200;

		const response = await request(server).get('/');
		expect(response.status).toEqual(expected);

});

it('should return JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
});	
});


describe('server testing for post request', () => { 

it('should return the name', async() => {
                const expected ={Hi: "Su"};

                const response = await request(server).post('/names').send({name: "Su"});
                expect(response.body).toEqual(expected);

});
});




});
