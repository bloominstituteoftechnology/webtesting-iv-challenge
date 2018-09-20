const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("run the tests", () => {
    expect(true).toBeTruthy();
  });
});

describe("DELETE /:id", () => {
  it("should have status 500", async () => {
    const response = await request(server).delete("/2");

    expect(response.status).toEqual(500);
  });
  it("should provide the type of the type text/html", async () => {

    const response = await request(server).delete('/2');

    expect(response.type).toEqual('text/html');
  });
  it('should return the {errorMessage: "Problems deleting"', async () => {
    const response = await request(server).delete('/2');

    expect(response.body).toEqual({errorMessage: "Problems deleting"});
  });

});

describe("POST /", () => {
  it("should have status 201", async () => {
    const posting = {
      date: Date.now(),
      open: 1.2345,
      high: 1.2489,
      low: 1.2304,
      close: 1.2389
    };
    const response = await request(server)
      .post("/")
      .send(posting);

    expect(response.status).toEqual(201);
  });
  it("should have status 500 if a property is missing", async () => {
    const response = await request(server)
      .post("/")
    expect(response.status).toEqual(500); 
  });
  it("should have status 500 if a property is missing", async () => {
    const posting = {
      date: Date.now(),
      open: 1.2345,
      high: 1.2489,
      low: 1.2304,
    };
    const response = await request(server)
      .post("/")
      .send()
    expect(response.status).toEqual(500); 
  });
});
