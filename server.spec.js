const request = require("supertest");
const server = require("./api/server.js");

describe("server", () => {
  // ===== GET server ===============================================
  describe("GET /", () => {
    it('should return { message: "UP" }', async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({ message: "UP" });
    });
    it("should return status 200(OK)", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("should return JSON", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });

  // ===== GET USER-LIST===============================================
  describe("GET /api/users", () => {
    it("should return user-list", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
    });
    it("should return status 200(OK)", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
    });
    it("should return JSON", async () => {
      const response = await request(server).get("/api/users");
      expect(response.type).toBe("application/json");
    });
  });

  // ===== POST request using JSON OBJECT===============================================
  describe("POST /api/users", () => {
    it("should add the user", async () => {
      const name = "Michael";
      const expected = { name: "Michael" };
      const response = await request(server).post(`/api/users/${name}`);
      expect(response.body).toEqual(expected);
    });
    it("should return status 200(OK)", async () => {
      const name = "Michael";
      const response = await request(server).post(`/api/users/${name}`);
      expect(response.status).toBe(200);
    });
    it("should return JSON", async () => {
      const name = "Michael";
      const response = await request(server).post(`/api/users/${name}`);
      expect(response.type).toBe("application/json");
    });
  });

  // ===== POST using '/users/:name'===============================================
  describe("POST /api/users/:name", () => {
    it("should add the user", async () => {
      const name = "Michael";
      const expected = { name: "Michael" };
      const response = await request(server).post(`/api/users/${name}`);
      expect(response.body).toEqual(expected);
    });

    it("should return status 200(OK)", async () => {
      const name = "Michael";
      const response = await request(server).post(`/api/users/${name}`);
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      const name = "Michael";
      const response = await request(server).post(`/api/users/${name}`);
      expect(response.type).toBe("application/json");
    });
  });

  // ===== DELETE using ID===============================================
  describe("DELETE /api/users/:name", () => {
    it("should delete the user", async () => {
      const name = "Michael";
      const expected = { deleted: `${name}` };
      const response = await request(server).delete(`/api/users/${name}`);
      expect(response.body).toEqual(expected);
    });
    it("should return status 200(OK)", async () => {
      const name = "Michael";
      const response = await request(server).delete(`/api/users/${name}`);
      expect(response.status).toBe(200);
    });
    it("should return JSON", async () => {
      const name = "Michael";
      const response = await request(server).delete(`/api/users/${name}`);
      expect(response.type).toBe("application/json");
    });
  });
});
