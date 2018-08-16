const request = require("supertest");

const server = require("./server.js");

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200 OK', async () => {
            const expected = 200;
            const res = await request(server).get('/');

            expect (res.status).toEqual(expected);
        });
        it("should return JSON", async () => {
            const res = await request(server).get("/");
      
            expect(res.type).toEqual("application/json");
          });

          it("should return object that looks like {api:running} ", async () => {
            const expected = { api: "running" };
      
            const res = await request(server).get("/");
      
            expect(res.body).toEqual(expected);
          });
    });

    describe('POST endpoint (/countries)', () => {
        it('should return status code 201 created', async () => {
            const expected = 201;

            const res = await request(server)
            .post('/countries')
            .send({country: 'USA'});
            expect(res.status).toEqual(expected)
        });

        it('should return created country', async () => {
            const expected = {country: "USA"};

            const res = await request(server)
            .post('/countries')
            .send({country: 'USA'});
            expect(res.body).toEqual(expected)
        });
    });
});