const request=require('supertest');
const server=require('./server.js');

describe('server.js',()=>{
    describe('GET /cars',()=>{
        it('returns a 200 ok status code.',async ()=>{
            const response=await request(server).get('/cars');
            expect(response.status).toEqual(200);
        })
        it('should return a list of cars',async()=>{
            const expectedBody={'cars':[{id:0,model:'Toyota Camry'},{id:1,model:'Honda Civic'}]};
            const response=await request(server).get('/cars');
            expect(response.body).toEqual(expectedBody);
        })
        it('should return a JSON object',async ()=>{
            const response=await request(server).get('/cars');
            expect(response.type).toEqual('application/json');
        })
    })
    describe('POST /cars',()=>{
        it('returns a 201 status code',async ()=>{
            const response=await request(server).post('/cars').send({model:'Honda Accord'});
            expect(response.status).toEqual(201);
        })
        it('returns the id of the car',async()=>{
            const response=await request(server).post('/cars').send({model:'Honda Accord'});
            expect(response.body.id).toEqual(3);
        })
        it('should return a JSON object',async()=>{
            const response=await request(server).post('/cars').send({model:'Honda Accord'});
            expect(response.type).toEqual('application/json');
        })
    })
    describe('DELETE /cars/:id',()=>{
        it('returns delete count and status 200 on success',async()=>{
            const id=1;
            const response=await request(server).delete(`/cars/${id}`);
            expect(response.body).toEqual(1);
            expect(response.status).toEqual(200);
        })
        it('should return a JSON object',async ()=>{
            const id=0;
            const response=await request(server).delete(`/cars/${id}`);
            expect(response.type).toEqual('application/json');
        })
        it('returns status 404 on fail',async()=>{
            const id=0;
            const response=await request(server).delete(`/cars/${id}`);
            expect(response.status).toEqual(404);
        })
    })
})