const request = require('supertest');

const server = require('./server');

describe('server',()=>{
    it('return http status code',async ()=>{


const response = await request(server).get('/')
expect(response.status).toEqual(200);


    })

})