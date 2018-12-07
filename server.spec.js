const daServa = require('./server');
const request = require('supertest');
const db = require('./knexConfig');

beforeEach(async () => {
    await db('users').truncate();
    })
    
describe('index.js', ()=>{
    
    describe('POST method', ()=>{
    
        it('returns status code', ()=>{


        })
        
        it('successfully posts a new user', async ()=>{
            const user = {username: 'Avicenna'}
            const response = await request(daServa).post('/users').send(user)
            
            expect(response.status).toBe(200) //TEST 1
            expect(response.body).toEqual([1]) //TEST 2
        })


    })
})
