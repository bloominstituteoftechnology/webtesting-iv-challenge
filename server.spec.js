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
                const expected ={Hi: "Hermione"};

                const response = await request(server).post('/greet').send({name: "Hermione"});
                expect(response.body).toEqual(expected);

});

it('should return full name on POST /greet/:name', async() => {
                const expected ={hello: "Harry Joe"};

                const response = await request(server)
		.post('/greet/Harry')
		.send({lastName: "Joe"});

                expect(response.body).toEqual(expected);

});


it('should return 404 status code when either name or lastname missing', async() => {
                const expected =422;

                const response = await request(server)
                .post('/greet/Hi')
                .send({lastName: ""});
		
                expect(response.status).toEqual(expected);

});

});

describe('server testing for delete request', () => {

it('should return status Code 200 OK', async() => {
                const expected = 200;

                const response = await request(server).delete('/greet/1');
                expect(response.status).toEqual(expected);

});

it('should return JSON with a message "Deleted" ', async() => {
                const expected = {message: "Deleted"};

                const response = await request(server).delete('/greet/2');
                expect(response.status).toEqual(200);

});
});

});
