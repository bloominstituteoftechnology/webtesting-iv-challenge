const request = require('supertest')
const mongoose = require('mongoose')
const server = require('../server')
const User = require('./User')

describe('User Controllers', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb')
    })

    afterEach(() => {
        return User.remove()
    })

    afterAll(() => {
        return mongoose.disconnect()
    })

    const testUser = { username: 'cass', password: 'password' }

    it('should create a new user', async () => {
        const response = await request(server)
            .post('/api/users/register')

        expect(response.status).toBe(201)
    })
})