/*
- When making a GET request to the '/' endpoint
the API should respond with status code 200
and the follow JSON object: {api: 'running}
*/

const server = require('./server');
const request = require('supertest')
const User = require('./users/User')

describe('server.js', () => {
    it('should return OK and a JSON object from the index route', async () => {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };

        const response = await request(server).get('/');
        expect(response.status).toEqual(expectedStatusCode)
        expect(response.body).toEqual(expectedBody)
        expect(response.type).toEqual('application/json')
        // 
    })
})

describe('/users', () => {
    afterEach(() => {
        return User.remove();
    });

    it('should create a user and return status 201', async () => {
        const bilbo = { username: 'frodo', password: '12344556' }
        const newUser = await request(server).post('/api/users').send(bilbo)

        expect(newUser.status).toBe(201)
    })
    it('should create a user and return the User as Json Object', async () => {
        const bilbo = { username: 'Carl', password: '12344556' }
        const newUser = await request(server).post('/api/users').send(bilbo)
        expect(newUser.body.username).toEqual('Carl')
    })

    it('should send status 400 if our password is below 6 characters long', async () => {
        const bilbo = { username: 'Nando', password: '123' }
        const newUser = await request(server).post('/api/users').send(bilbo)
        expect(newUser.status).toBe(400)
    })
})

describe('/delete', () => {
    it('should delete a user and return it with status 204', async () => {
        const user = { username: 'Klaus', password: '12344556' }
        newUser = {}

        return request(server).post('/api/users').send(user)
            .then(response => newUser = response.body)
            .catch(err => console.log(err))

        const reponse = await request(server).delete('/api/users').send({ id: newUser.id })

        expect(response.status).toBe(204)
        expect(deletedUser._id).toBe(newUser._id)
    })
    it('should return 400 if presented with malformed ', async () => {
        const response = await request(server).delete('/api/users').send({ id: "123412341234" })
        expect(response.status).toBe(400)
    })

})