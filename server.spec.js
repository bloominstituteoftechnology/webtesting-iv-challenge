const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("run the tests", () => {
    expect(true).toBeTruthy();
  });
});

describe("POST /", () => {
  it("should return a 201 status code", async () => {
    const response = await request(server)
      .post("/")
      .send({ firstname: "Adam", lastname: "Lee" });
    expect(response.status).toEqual(201);
  });

  it("should return the post id", async () => {
    const response = await request(server)
      .post("/")
      .send({ firstname: "Adam", lastname: "Lee" });
    expect(typeof response.body).toEqual("number");
  });
});

describe('DELETE /', () => {
    it('should return a 200 status code', async () => {
        const response = await request(server)
        .delete(`/1`)
        expect(response.status).toEqual(200);
    });

    it('should return number of items deleted', async () => {
        const response = await request(server)
        .delete(`/2`)
        expect(response.body).toEqual({ message: `1 friends have been deleted.`});
    })
})
