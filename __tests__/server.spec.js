const request = require('supertest')

const server = require('../server.js')

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200', async () => {
            const expected = 200
            const response = await request(server).get('/')
            expect(response.status).toEqual(expected)
        })

        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).get('/')
            expect(response.type).toEqual(expected)
        })

        it('should return { "api": "running" }', async () => {
            const expected = { "api": "running" }
            const response = await request(server).get('/')
            expect(response.body).toEqual(expected)
        })
    })

    describe('Get /musicians ', () => {
        it('should return status code 200', async () => {
            const expected = 200
            const response = await request(server).get('/musicians')
            expect(response.status).toEqual(expected)
        })

        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).get('/musicians')
            expect(response.type).toEqual(expected)
        })

        it('returns a list from /musicians', async () => {
            const expected = [
                {
                    name: "Paul",
                    instrument: "Bass"
                },
                {
                    name: "John",
                    instrument: "Guitar"
                },
                {
                    name: "Ringo",
                    instrument: "Drums"
                },
                {
                    name: "George",
                    instrument: "Guitar"
                }
            ]

            const response = await request(server).get('/musicians')
            expect(response.body).toEqual(expected)
        })
    })

    // describe('', () => {

    // })
})