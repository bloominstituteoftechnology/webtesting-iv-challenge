const request = require('supertest')
const server = require('./server.js')
const users = require('./usersModel.js')
const db = require('./data/dbConfig.js')

beforeEach(async () => {
    await db('users').truncate()
})

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

    describe('POST /hello', () => {

        it('should greet the person', async () => {
            let response = await request(server)
            .post(`/hello`)
            .send({ firstName: 'Conner', lastName: 'Hoessly' })

            expect(response.body).toEqual({ hello: 'Conner Hoessly' })
        })

    })

    describe('POST should create a user', () => {

        it('should return status code 200', async () => {

            const response = await request(server)
            .post('/user')
            .send({ name: 'bryan' })
            expect(response.status).toBe(201)

        })

        it('should insert user', async () => {
           let doesExist = await db('users').where({ name: 'conner' })
           expect(doesExist).toHaveLength(0) 

           await users.insert({ name: 'conner' })
           await users.insert({ name: 'tim' })

           doesExist = await db('users').where({ name: 'conner' })
           expect(doesExist).toHaveLength(1)

           doesExist = await db('users')
           expect(doesExist).toHaveLength(2)
        })

    })

    describe('DELETE should delete a user', () => {

        it('should return status code 202', async () => {
            
            await users.insert({ name: 'conner' })

            const response = await request(server)
            .delete('/:user')
            .send('conner')
            expect(response.status).toBe(202)
        })

        it('should delete a user', async () => {
            await users.insert({ name: 'conner' })

            let doesExist = await db('users').where({ name: 'conner' })
           expect(doesExist).toHaveLength(1)
           
           await users.remove('conner')

           doesExist = await db('users').where({ name: 'conner' })
           expect(doesExist).toHaveLength(0)

        })

    })

})