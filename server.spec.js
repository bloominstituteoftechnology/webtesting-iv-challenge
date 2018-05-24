const request = require("supertest");
const User = require('./Users/User')
const server = require('./server');

describe('server', () => {
    it('Should return OK and json object from index route', async() => {
        const expectedBody = {api: "running"};
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    })

    it('Should return OK and json object from index route and have 2 users', async() => {
        const response = await request(server).get('/users');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toHaveLength(3)
    })

    it("Should delete a user and return it's name", async() => {
        const id = "5b071c547ab01331a8e4a01f";
        const response = await request(server).delete(`/${id}`);
        expect(response.body).toEqual({message: "Deleted"});
        expect(response.status).toEqual(200);
    });

})