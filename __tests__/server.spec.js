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
                    id: 1,
                    name: "Paul",
                    instrument: "Bass"
                },
                {
                    id: 2,
                    name: "John",
                    instrument: "Guitar"
                },
                {
                    id: 3,
                    name: "Ringo",
                    instrument: "Drums"
                },
                {
                    id: 4,
                    name: "George",
                    instrument: "Guitar"
                }
            ]

            const response = await request(server).get('/beatles')
            expect(response.body).toEqual(expected)
        })
    })

    describe('POST /beatles', () => {
        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).post('/beatles')
            expect(response.type).toEqual(expected)
        })

        it('should return status code 422 when no info sent', async () => {
            const expected = 422
            const response = await request(server).post('/beatles')
            expect(response.status).toEqual(expected)
        })

        it('should return status code 422 when incomplete info sent', async () => {
            const expected = 422
            const fifthBeatle = {
                id: 5,
                instrument: "Spoons"
            }
            const response = await request(server).post('/beatles').send(fifthBeatle)
            expect(response.status).toEqual(expected)
        })

        it('adds new musician to the Beatles and returns the new group', async () => {
            const fifthBeatle = {
                id: 5,
                name: "Alex",
                instrument: "Spoons"
            }

            const response = await request(server).post('/beatles').send(fifthBeatle)
            expect(response.body).toContainEqual(fifthBeatle)
        })

        it('should tell the bad news when it throws an error ', async () => {
            const error = { error: true }
            const response = await request(server).post('/beatles').send(error)
            expect(response.body.error).toMatch('The beatles really don\'t need another member')
        })
    })

    describe('DELETE /beatles', () => {
        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).delete('/beatles')
            expect(response.type).toEqual(expected)
        })

        it('should return 422 when no info passed', async () => {
            const expected = 422
            const response = await request(server).delete('/beatles')
            expect(response.status).toEqual(expected)
        })

        it('should delete a beatle when name is given', async () => {
            const killThisBeatle = { name: 'Ringo' }
            const response = await request(server).delete('/beatles').send(killThisBeatle)

            expect(response.body.map(beatle => beatle.name)).not.toContain(killThisBeatle.name)
        })

        it('should delete a beatle when id is given', async () => {
            const killThisBeatle = { id: 1 }
            const response = await request(server).delete('/beatles').send(killThisBeatle)

            expect(response.body.map(beatle => beatle.id)).not.toContain(killThisBeatle.id)
        })

        it('should delete a beatle when instrument is given', async () => {
            const killThisBeatle = { instrument: 'Guitar' }
            const response = await request(server).delete('/beatles').send(killThisBeatle)

            expect(response.body.map(beatle => beatle.instrument)).not.toContain(killThisBeatle.instrument)
        })
    })
    describe('PUT /beatles', () => {
        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).put('/beatles')
            expect(response.type).toEqual(expected)
        })

        it('should return 422 when no info passed', async () => {
            const expected = 422
            const response = await request(server).put('/beatles')
            expect(response.status).toEqual(expected)
        })

        it('should modify instrument of a beatle when id is given', async () => {
            const modifications = {id: 1, instrument: 'Banjo'}
            const response = await request(server).put('/beatles').send(modifications)

            expect(response.body.instrument).toMatch(modifications.instrument)
        })

        it('should modify name of a beatle when id is given', async () => {
            const modifications = {id: 1, name: 'Julio'}
            const response = await request(server).put('/beatles').send(modifications)

            expect(response.body.name).toMatch(modifications.name)
        })
    })
})