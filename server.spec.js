/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/

const request = require('supertest')
const server = require('./server') //doesn't exist yet

describe('server' , () => {
    it('should return the correct status code and message for GET to route "/"', async () => {
        const expectedStatusCode = 200
        const expectedMessage = { api: 'running' }

        const response = await request(server).get('/')

        expect(response.status).toEqual(expectedStatusCode)
        expect(response.body).toEqual(expectedMessage)
    })
})