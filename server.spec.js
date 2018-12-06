const daServa = require('./index');
const request = require('supertest');
const db = require('./knexConfig');

describe('index.js', ()=>{
    
    describe('POST method', ()=>{
    
    
        it('returns proper status code', ()=>{
            const request = request(server).post('/users')

            expect(request.status).toBe(200)
        })
        
        it('successfully posts a new user', async ()=>{
            const user = {name: 'Avicenna'}
            const request = request(server).post('/users').send(userPost)
            const userPost = await db('users').insert({user})
            expect(request.status).toBe(200)
            expect(request.body).toBe(userPost)
        })


    })
})
