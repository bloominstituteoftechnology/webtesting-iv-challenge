const request = require("supertest");
const server = require("../index");

describe("Index Route", () => {
  describe("GET /", () => {
    it("should respond with status of 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
});

describe("Notes Route", () => {
  describe("GET /api/notes", async () => {
    it("should check for the response", async () => {
      const res = await request(server).get("/api/notes");
      expect(res.status).toBe(200);
    });

    it("should check for the response body", async () => {
      const res = await request(server).get("/api/notes");
      expect(res.body.status).toBe(true);
      expect(typeof res.body.data).toBe("object");
    });
  });

  describe("POST /api/notes", async () => {
    it("should post notes", async () => {
      const res = await request(server)
        .post("/api/notes")
        .send({
          title: "Test Titile",
          content: "Test",
          keywords: []
        });

        expect(res.body.status).toBe(true)
    });
  });

  describe("PUT /api/notes", async () => {
      it ("should update notes", async () => {
          const res = await request(server)
          .put("/api/notes/1")
          .send({
              title: "updated title",
              content: "test",
              keywords: ['updated']
          })

          expect(res.status).toBe(200)
      })
  })

  describe("DELETE /api/notes", async () => {
    it ("should delete notes", async () => {
        const res = await request(server)
        .delete("/api/notes/1")

        expect(res.status).toBe(200)
    })
})
});
