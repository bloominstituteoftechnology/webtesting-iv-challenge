const requrest = require("supertest");

const server = require("./api/server.js");

describe("server", () => {
  it("can run tests", () => {
    expect(true).toBeTruthy();
  });
});

describe("server", () => {
  describe("GET /", () => {
    it("should return status code 200(OK)", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
  });
  it("can run more tests", () => {
    expect(false).toBeFalsy();
  });
  it("can run even more tests", () => {
    expect(false).toBeFalsy();
  });
});

describe("POST /create", () => {
  it("should return a name", async () => {
    const name = "Anthony";
    const response = await request(server)
      .post("/create")
      .send({ name });
    expect(response.body).toEqual({ user: "Anthony" });
  });
  it("should return a 200 status", async () => {
    const response = await request(server).post("/create");
    expect(response.status).toBe(200);
  });
  it("should return some JSON", async () => {
    const response = await request(server).post("/create");
    expect(response.type).toBe("application/json");
  });
});

describe("DELETE /delete", () => {
  it("should return true", async () => {
    const name = "Anthony";
    const response = await request(server)
      .delete("/delete")
      .send({ name });
    expect(response.body).toEqual(true);
  });
  it("should return a status of 200", async () => {
    const name = "Anthony";
    const response = await request(server)
      .delete("/delete")
      .send({ name });
    expect(response.status).toBe(200);
  });
  it("should return JSON", async () => {
    const response = await request(server).delete("/delete");
    expect(response.type).toBe("application/json");
  });
});
