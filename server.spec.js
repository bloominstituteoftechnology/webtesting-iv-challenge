const request = require('supertest')
const server = require('./server.js')

describe('server.js', () => {

    describe('/ route', () => {
        it('should return status code 200', async () => {
            const response = await request(server).get('/')
            expect(response.status).toBe(200)
        })
        it('should return JSON', async () => {
            const response = await request(server).get('/')
            expect(response.type).toBe('application/json')
        })
    })

})