const server = require('./api/server.js');
const request = require('supertest');

describe('server', ()=>{
    it('can run test',()=>{
        expect(true).toBeTruthy();
    })
    it('can run more test', ()=>{
        expect(false).toBeFalsy();
    })

    describe('GET /',()=>{
        it('should return status code 200(OK)', async ()=>{
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        })
        it('should return JSON', async ()=>{
            const response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        })
        it('should return a default memory data ', async () =>{
            const response = await request(server).get('/');
            expect(response.body).toEqual([{name: "Evelyn",
            lastName: "Huang"}]);
        })
    })
    describe('POST /hello/:name',()=>{
        it('should return status code 201(OK)', async ()=>{
            const name = 'Tsai';
            const response = await request(server).post(`/hello/${name}`);
            expect(response.status).toBe(201);
        })
        it('should return JSON', async ()=>{
            const name = 'Tsai';
            const response = await request(server).post(`/hello/${name}`);
            expect(response.type).toBe('application/json');
        })

        it('should greet the person', async ()=>{
            const name = 'Tsai';
            const lastName = 'Huang';
            const expected = { hello: 'Tsai Huang'};

            const response = await request(server).post(`/hello/${name}`).send({ lastName});
            expect(response.body).toEqual(expected);
        })
      
    })
    describe('DELETE /hello/:name',()=>{
        it('should return status code 201(OK)', async ()=>{
            const name = 'Tsai';
            const response = await request(server).delete(`/hello/${name}`);
            expect(response.status).toBe(201);
        })
        it('should return JSON', async ()=>{
            const name = 'Tsai';
            const response = await request(server).delete(`/hello/${name}`);
            expect(response.type).toBe('application/json');
        })

        it('should confirm if the person has been deleted', async ()=>{
            const name = 'Tsai';
            // const lastName = 'Huang';
            const expected = { deleted: 'Tsai'};

            const response = await request(server).delete(`/hello/${name}`);
            //.send({ lastName});
            expect(response.body).toEqual(expected);
        })
    })
    describe('PUT /hello/:name',()=>{
        it('should return status code 200(OK)', async ()=>{
            const name = 'Tsai';
            const lastName = 'Huang';
            const response = await request(server).put(`/hello/${name}`).send({lastName});
            expect(response.status).toBe(200);
        })
        it('should return JSON', async ()=>{
            const name = 'Tsai';
            const lastName = 'Huang';
            const response = await request(server).put(`/hello/${name}`).send({lastName});
            expect(response.type).toBe('application/json');
        })

        it('should confirm if the person has been updated', async ()=>{
            const name = 'Tsai';
            const lastName = 'Huang';
            const expected = { updated: 'Tsai Huang'};

            const response = await request(server).put(`/hello/${name}`)
            .send({ lastName});
            expect(response.body).toEqual(expected);
        })
    })
    
    
})