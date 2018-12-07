const request = require("supertest");

const server = require("./api/server.js");

const db = require("./data/dbConfig.js");
// const firefly = require("./api/fireflyModel");

beforeEach(async () => {
    await db("firefly").truncate();
});

describe("server", () => {

    it("should return status code 200", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
    });

    it("should insert character", async () => {
        let rows = await db("firefly")
            .where({ name: "Mal" });
        expect(rows).toHaveLength(0);

        await db("firefly").insert({ name: "Mal" });
        await db("firefly").insert({ name: "Jayne" });

        rows = await db("firefly")
            .where({ name: "Mal" });
        expect(rows).toHaveLength(1);

        rows = await db("firefly");
        expect(rows).toHaveLength(2);
    });

    it("should get proper response to post", async () => {
        const response = await request(server).post("/api/firefly")
            .send({ name: "Zoe" });
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(201);
    });

    it("should delete character", async () => {
        await db("firefly").insert({ name: "River" });
        await db("firefly").delete()
            .where({ name: "River" });
        let rows = await db("firefly")
            .where({ name: "River" });
        expect(rows).toHaveLength(0);
    });

    it("should get proper response to delete", async () => {
        await db("firefly").insert({ name: "Book" });
        const response = await request(server).delete("/api/firefly/1");
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
    });

});