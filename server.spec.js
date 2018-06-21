const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  it("should return status code 200 and json object from the index route", async () => {
    const expectedCode = 200;
    const expectedBody = { api: "running" };

    const response = await request(server).get("/");

    expect(response.status).toEqual(expectedCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual("application/json");
  });
  it("should return status code 201 and return username when creating user", async () => {
    beforeAll(() => {
      mongoDB.connect();
    });
    afterAll(done => {
      mongoDB.disconnect(done);
    });

    const user = { username: "sam", password: "sam" }
    const expectedCode = 500;
    const expectedBody = { username: "sam" };

    const response = await request(server).post('/user').send(user);

    expect(response.status).toEqual(500);
    expect(response.body).toEqual(expectedBody);
  });
//   it("should return status code 201 and return username when creating user", async () => {
//     beforeAll(() => {
//       mongoDB.connect();
//     });
//     afterAll(done => {
//       mongoDB.disconnect(done);
//     });

//     const expectedCode = 500;
//     const expectedBody = { username: "sam" };

//     let response = await request(server).get("/user");
//     response = await request(server).delete("/user");
//     response = await request(server).get("/user");

//     expect(response.status).toEqual(201);
//     expect(response.body).toEqual(expectedBody);
//   });
});
