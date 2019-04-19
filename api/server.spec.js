
const request = require("supertest");
const server = require("./server.js");
describe("the test modul", () => {
 describe("the create endpoint", () => {
    it ("should return 201 when data is valid", async () => {

        const res = await request(server)
          .post("/api/hobbits")
          .send({ hobbitName: "frodo" });

        expect(res.status).toBe(201);
    });
    it ("should return 400 when data is invalid", async () => {

        const res = await request(server)
          .post("/api/hobbits")
          .send({ wrongData: "Voldemort" });
        expect(res.status).toBe(400);
    });

     it("should return a hobbit's id ", async () => {
        const res = await request(server)
          .post("/api/hobbits")
          .send({ hobbitName: 'Gollum'});
        expect(res.body.length).toBe(1);
    });
});

 describe("the delete endpoint", () => {
    it ("should return status 200 and id 1 ", async () => {
        const res = await request(server)
          .delete("/api/hobbits/1");

        expect(res.status).toBe(200);
        expect(res.body).toBe(1);
    });

    it ("should return 404 when hobbit does not exist", async () => {
        const res = await request(server)
        .delete("/api/hobbits/5");

        expect(res.status).toBe(404);
    });
})
});