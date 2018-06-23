const request = require('supertest');
const server = require('./server'); // This is our first red, it doesn't exist.
const User = require('./users/User');
// const mongoose = require('mongoose');

describe('server.js', () => {
    it('Should return an "okay" status and a JSON object from the index route.', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'Running...'}

        // Do a GET request to our API (in server.js) and inspect the response. 
        const response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    });
});

describe('/users', () => {
    afterEach(() => {
        return User.remove();
    })

    it('Should create a new user and return status code 201.', async () => {
        const user = { username: 'Paul Graham', password: 'ycombinator' }
        const newUser = await request(server).post('/api/users').send(user)

        expect(newUser.status).toBe(201)
    });

    it('Should create a new user and return his/her name as a JSON object.', async () => {
        const user = { username: 'Jessica Livingston', password: 'ycombinator' }
        const newUser = await request(server).post('/api/users').send(user)
        
        expect(newUser.body.username).toEqual('Jessica Livingston')
    });

    it('Should send status code 400 if the password length is below 10 characters.', async () => {
        const user = { username: 'Sam Altman', password: 'ycom' }
        const newUser = await request(server).post('/api/users').send(user)
        
        expect(newUser.status).toBe(400)
    });
});

describe('/delete', () => {
    it('Should delete a user and return with a status code 204', async () => {
        const expectedStatusCode = 204;
        const expectedBody = { username: 'Michael Seibel', password: 'ycombinator' }

        const newUser = await request(server).post('/api/users')
        deletedUser = await request(server).delete(`/users/${newUser.body._id}`).set('Accept', 'application/json')

        expect(newUser.body.username).toEqual('Michael Seibel')
        expect(newUser.body.password).not.toEqual('ycombinator')

        expect(deleteUser.body.username).toEqual('Michael Seibel')
        expect(deleteUser.body.password).not.toEqual('ycombinator')
    });

    it('Should return status code 404 if user is not found.', async () => {
        const response = await request(server).delete('/api/users').send({ id: 'samplebadrequest' })
        
        expect(response.status).toBe(404)
    });
});

        // // Create the user
        // let supertestResponse = await request(server).get('/123');
        // // Check that the user exists            
        // supertestResponse = await request(server).delete('/123');
        // supertestResponse = await request(server).get('/123');
        // // Check that the user is not there any more.

        // // using .then()
        // // let response;
        // // return request(server).get('/').then(res => {
        // //   response = res;

        // //   expect(response.status).toEqual(expectedStatusCode);
        // //   expect(response.body).toEqual(expectedBody);
        // //   expect(response.type).toEqual('application/json');
        // // })

