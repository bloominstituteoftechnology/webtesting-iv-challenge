const request = require('supertest')
const server = require('./server')

describe('server' , () => {
    it('should return the correct status code and message for GET to route "/"', async () => {
        const expectedStatusCode = 200
        const expectedMessage = { api: 'running' }

        const response = await request(server).get('/')

        expect(response.status).toEqual(expectedStatusCode)
        expect(response.body).toEqual(expectedMessage)
    })
})