const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("run the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /games", () => {
    it("should return a 200 status code", async () => {
      const response = await request(server).get("/tasks");
      expect(response.status).toEqual(200);
    });

    it("should return an array", async () => {
      const response = await request(server).get("/tasks");
      expect(Array.isArray(response.body)).toEqual(true);
    });

    it("should return an empty array", async () => {
        const response = await request(server).get("/tasks");
        expect(response.body).toEqual([]);
      });
  });

  describe("POST /tasks", () => {
    it("should return a 200 status code", async () => {
      const response = await request(server)
        .post("/tasks")
        .send({ id: 1, taskname: "Shop", completed:true });
      expect(response.status).toEqual(200);
    });

    it("should return a 422 status code", async () => {
      const response = await request(server)
        .post("/tasks")
        .send({ taskname: "", completed:false });
      expect(response.status).toEqual(422);
    });

    it("should return a 422 status code", async () => {
      const response = await request(server)
        .post("/tasks")
        .send({ taskname: "Work", completed:null });
      expect(response.status).toEqual(422);
    });


  });


  describe("DELETE /tasks/:id", ()=>{
      it("should return the number of the deleted item", async ()=>{
        let response = await request(server)
        .post("/tasks")
        .send({ id: 2, taskname: "Shop", completed:true });
        response = await request(server).delete('/tasks/2');
        expect(response.numberDeleted).toEqual(2);
      })
  })
}); 