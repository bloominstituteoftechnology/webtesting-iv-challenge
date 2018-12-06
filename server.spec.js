const request = require('supertest')
const server = require('./server.js')

describe('endpoint testing', () => {
    it('should return a passed test', () => {
        expect(true).toBe(true)
    })

    it('endpoint "/"should return status code 200', async () => {
        let res = await request(server).get('/')
        expect(res.status).toBe(200)
    })

    it('endpoint "/" should return json object {api: "alive!"}', async () => {
        let res = await request(server).get('/')
        expect(res.body).toEqual({api: 'alive!'})
    })


describe('endpoint /create test suite',  () => {
    it('/create should return status code 200', async () => {
        let res = await request(server).post('/create')
        expect(res.status).toBe(200)
    })

    it('endpoint /create should return the object passed in the req.body', async () => {
        const bodyObj = {username: 'brad', password: 'pass'}
        let res = await request(server)
        .post('/create')
        .send(bodyObj)
        expect(res.body).toEqual(bodyObj)
    })
})

describe('endpoint /remove test suite',  () => {
    it('/remove/1 should return status code 200', async () => {
        let res = await request(server)
        .delete('/remove/1')
        expect(res.status).toBe(200)
    })

    it('endpoint /remove/:id should return the id of the item removed', async () => {
        let res = await request(server)
        .delete('/remove/1')
        expect(res.body).toBe('1')
    })
})


})