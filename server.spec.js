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
        it('should return message: im working ', async () => {
            const body = { message: 'im working' }
            const response = await request(server).get('/')
            expect(response.body).toEqual(body)
        })
    })

    describe('POST /hello/:name', () => {

        it('should greet the person', async () => {
            const expected = { hello: 'Conner Hoessly' }
            const name = 'Conner Hoessly'
            const response = await request(server).post(`/hello/${name}`).send({ name })

            expect(response.body).toEqual(expected)
        })

    })

    describe('POST should create a user', () => {

        it('should return status code 200', async () => {
            const response = await request(server).get('/user')
            expect(response.status).toBe(201)
        })

    })

    describe('DELETE should delete a user', () => {

        it('should return status code 200', async () => {
            const response = await request(server).get('/:user')
            expect(response.status).toBe(202)
        })

    })

})