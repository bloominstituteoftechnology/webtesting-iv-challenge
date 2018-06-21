const request = require('supertest');
const server = require('./server.js'); 
const model = require('./userModel.js');

describe('server.js', () => {
    it('should return OK status code and a JSON object from the index route', async() =>{
        const expectedStatusCode = 200;
        const expectedBody = { api: "running.." };
        let response = await request(server).get('/');

        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body).toEqual(expectedBody);
        expect(response.type).toEqual('application/json');
    })

    it('should check if Users API was fetched', async() => {
        const response = await request(server).get('/api/users');
      
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
    })

    it('should check if user was deleted', async() => {
    
        let id = '5b2c082977312be52de85268';
        const response = await request(server).delete('/api/delete/:id');
        expect(response.body).toEqual(removedUser);
        
    })
})


