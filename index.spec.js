const request = require("supertest");

const server = require("./api/server.js");

describe("server", () => {

    it("should return status code 200", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
    });

});