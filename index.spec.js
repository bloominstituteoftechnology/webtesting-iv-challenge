const server = require("./index");
const request = require("supertest");

describe("POST", () => {
  it("should return a name", async () => {
    const name = "y";
    const response = await request(server)
      .post("/new")
      .send({ name });

    expect(response.body).toEqual({ user: "y" });
  });

  it("should return status 201", async () => {
    const response = await request(server).post("/new");

    expect(response.status).toBe(201);
  });

  it("should return JSON", async () => {
    const response = await request(server).post("/new");

    expect(response.type).toBe("application/json");
  });
});

describe(" DELETE", () => {
  it("should return a true", async () => {
    const name = "y";
    const response = await request(server)
      .delete("/remove")
      .send({ name });

    expect(response.body).toEqual(true);
  });

  it("should return status 200", async () => {
    const name = "y";
    const response = await request(server)
      .delete("/remove")
      .send({ name });

    expect(response.status).toBe(200);
  });

  it("should return JSON", async () => {
    const response = await request(server).delete("/remove");

    expect(response.type).toBe("application/json");
  });
});
