const request = require("supertest");

const server = require("./server");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });
});

describe("/", () => {
  it("returns a 200 status code", async () => {
    //get access to the server
    //user supertest to make a GET to the server
    const response = await request(server).get("/");

    expect(response.status).toEqual(200);
  });
  it(`should return {api: "running"}`, async () => {
    const expectedBody = { api: "running" };

    const response = await request(server).get("/");

    expect(response.body).toEqual(expectedBody);
  });
  it(`should return json`, async () => {
    const response = await request(server).get("/");

    expect(response.type).toEqual("application/json");
  });
});

describe("/greet/:name", () => {
  it("should greet the person", async () => {
    let name = "kyle";
    let last = "meltzer";
    const response = await request(server)
      .post(`/greet/${name}`)
      .send({ last });
    expect(response.body).toEqual({ Hello: "kyle meltzer" });
  });
});

describe("/users", () => {
  it("should return a list of users", async () => {
    const expectedBody = [{"id": 1, "name": "kyle"}];

    const response = await request(server).get("/users");

    expect(response.body).toEqual(expectedBody);
  });

  it(`should return json`, async () => {
    const response = await request(server).get("/users");

    expect(response.type).toEqual("application/json");
  });
  it("should return a 200 status code", async () => {
    const response = await request(server).get("/users");

    expect(response.status).toEqual(200);
  });
});
