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

    describe('Get /beatles ', () => {
        it('should return status code 200', async () => {
            const expected = 200
            const response = await request(server).get('/beatles')
            expect(response.status).toEqual(expected)
        })

        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).get('/beatles')
            expect(response.type).toEqual(expected)
        })

        it('returns a list from /beatles', async () => {
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

            const response = await request(server).get('/beatles')
            expect(response.body).toEqual(expected)
        })
    })

    describe('POST /beatles', () => {
        it('should return status code 200', async () => {
            const expected = 200
            const response = await request(server).post('/beatles')
            expect(response.status).toEqual(expected)
        })

        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).post('/beatles')
            expect(response.type).toEqual(expected)
        })

        it('adds new musician to the Beatles and returns the new group', async () => {
            const fifthBeatle = {
                name: "Alex",
                instrument: "Spoons"
            }

            const response = await request(server).post('/beatles').send(fifthBeatle)
            expect(response.body).toContainEqual(fifthBeatle)
        })

    })
})