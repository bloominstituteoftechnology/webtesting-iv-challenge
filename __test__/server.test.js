const request = require("supertest");

const server = require("../api/server.js");

describe("/ route", () => {
  it("should return status code 200", async () => {
    let response = await request(server).get("/");

    expect(response.status).toBe(200);
  });

  it("should return json response type ", async () => {
    let response = await request(server).get("/");

    expect(response.type).toBe("application/json");
  });

  it('should return with a body like: { api: "up" }', async () => {
    let response = await request(server).get("/");

    expect(response.body).toEqual({ api: "up" });
  });


  describe("/user route", () => {
    it('should return with a body like: { name: "Tom" } }', async () => {
      let response = await request(server)
        .post("/user")
        .send({ name: "Tom" });

      expect(response.body).toEqual({ name: "Tom" });
    });

    it('should return with a body like: { name: "Kam" } }', async () => {
        let response = await request(server)
          .post("/user")
          .send({ name: "Kam" });
  
        expect(response.body).toEqual({ name: "Kam" });
      });

      it('should return with a body like: { name: "Kam" } }', async () => {
        let response = await request(server)
          .delete("/user")
  
        expect(response.body).toEqual({ name: "Kam" });
      });

  });
});
