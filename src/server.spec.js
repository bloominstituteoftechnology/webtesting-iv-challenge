const request = require("supertest");
const server = require("./server.js");

describe("spinup server tests", () => {
  it("returns a status code of 200", async () => {
    const response = await request(server).get("/");

    // test part 1
    expect(response.status).toEqual(200);

    // test part 3
    expect(response.type).toEqual("application/json");
  });
});

// stretch clients get passing test
describe("GET for /clients", () => {
  // return status 200
  it("returns 200 on a get request", async () => {
    const response = await request(server).get("/clients");
    expect(response.status).toEqual(200);
  });

  // return a client object
  it("returns clients Object", async () => {
    const response = await request(server).get("/clients");
    expect(response.body).toEqual({ message: "success" });
  });
});

// base mvp tests

// create tests
describe("POST /clients test", () => {
  it("should return JSON object { message: `Client added` } when a client is successfully added and a status code of 200", async () => {
    const response = await request(server).post("/clients");
    // test part 1
    expect(response.body).toEqual({ message: "Client added" });

    // test part 2
    expect(response.status).toEqual(201);

    // test part 3
    expect(response.type).toEqual("application/json");
  });
});

// delete tests
describe("DELETE /clients/:id", () => {
  it("should return { message: `client deleted` } when a client is successfully deleted", async () => {
    const response = await request(server).delete("/clients/1");

    // test part 1
    expect(response.body).toEqual({ message: "client deleted" });

    // test part 2
    expect(response.status).toEqual(200);

    // test part 3
    expect(response.type).toEqual("application/json");
  });
});
