const server = require("./server.js");
const request = require("supertest");
 
describe("test API endpoints", () => {
  
  // GET tests
  it("GET should return 200 status code", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
  it("GET should return JSON of all todos", async () => {
    const response = await request(server).get("/api/todos");
    expect(response.type).toBe("application/json");
  });

  // POST tests
  it("POST should return 400 status code if no body is sent", async () => {
    const response = await request(server).post("/api/todos");
    expect(response.status).toBe(400);
  });
  it("POST should return 201 status code if todo body successfuly sent", async () => {
    const todo = { name: "new to do"};
    const response = await request(server)
      .post("/api/todos")
      .send(todo);
    expect(response.status).toBe(201);
  });
  it("POST should return JSON message", async () => {
    const response = await request(server).post("/api/todos");
    expect(response.type).toBe("application/json");
  });

  // DELETE tests 
  it("DELETE should return 202 status code", async () => {
    const response = await request(server).delete("/api/todos/1");
    expect(response.status).toBe(202);
  });
  it("DELETE should return JSON", async () => {
    const response = await request(server).delete("/api/todos/1");
    expect(response.type).toEqual("application/json");
  });

});