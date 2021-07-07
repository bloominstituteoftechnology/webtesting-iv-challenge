const server = require("./server.js");
const request = require("supertest");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("/", () => {
    it("returns a 200 status code", async () => {
      //get access to the server
      //user supertest to make a GET to the server
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("should return api: running", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    it("should return JSON", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/hello");

      expect(response.type).toEqual("application/json");
    });

    describe("/greet/:name", () => {
      it("should greet me", async () => {
        let name = "david";
        let last = "pok";
        //make a post passing last name in the body
        //and firt name as url parameter
        const response = await request(server)
          .post(`/greet/${name}`)
          .send({ last });
        //verify that the endpoint returns the right object
        expect(response.body).toEqual({ hello: "david pok" });
      });
    });
  });

  describe("/skills", () => {
    it("should post my nonexistant skills", async () => {
      const response = await request(server)
        .post("/skills")
        .send({ name: "david", skills: "none" });

      expect(response.body).toEqual({ name: "david", skills: "none" });
    });

    it("should delete skills", async () => {
      const response = await request(server)
        .delete("/skills")
        .send({ skills: "none" });

      expect(response.body).toEqual({ skills: "none" });
    });

  });
  
});
