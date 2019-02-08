const request = require("supertest");
const server = require("./server.js");

describe("the create route", () => {
    it ("responds with 201 when body is valid", async () => {
        const response = await request(server).post("/api/users").send({ username: "testing" });
        expect(response.status).toBe(201);
    });
    it ("responds with 400 when body is invalid", async () => {
        const response = await request(server).post("/api/users").send({ somethingElse: "invalid data" });
        expect(response.status).toBe(400);
    });

    it("returns an id on successful post", () => {
        const response = await request(server).post("/api/users").send({ username: "testing" });
        expect(response.body).toBe(1);
    });
});

describe("the delete route", () => {

});