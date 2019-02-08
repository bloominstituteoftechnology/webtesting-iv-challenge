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

    it("returns an id on successful post", async () => {
        const response = await request(server).post("/api/users").send({ username: "testing" });
        expect(response.body.length).toBe(1);
    });
});

describe("the delete route", () => {
    it ("responds with 200 when user exists", async () => {
        const response = await request(server).delete("/api/users/1");
        expect(response.status).toBe(200);
    });
    it ("responds with 404 when user does not exist", async () => {
        const response = await request(server).delete("/api/users/6");
        expect(response.status).toBe(404);
    });

    it("returns 1 on a successful delete", async () => {
        const response = await request(server).delete("/api/users/1");
        expect(response.body).toBe(1);
    });
});