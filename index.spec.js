const server = require("./api/server.js");
const request = require("supertest");

describe("GET /", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/");
		expect(response.status).toBe(200);
	});
	it("should return the names", async () => {
		const expected = { name: "Kanek" };
		const response = await request(server).get("/api/names");
		expect(response.body).toEqual(expected);
	});
});
describe("POST /api/:name", () => {
	it("should create a new name", async () => {
        const name = "David";
        
        const response = await request(server).post(`/api/${name}`);
        
		const expected = "David";
		expect(response.body).toEqual(expected);
	});
	it("should return status 201", async () => {
		const name = "Benny";
		const response = await request(server).post(`/api/${name}`);
		expect(response.status).toEqual(201);
	});
});


describe("DELETE /api/:id", () => {
	it("should return status 200", async () => {
		const id = "0";
		const response = await request(server).delete(`/api/${id}`);
		expect(response.status).toBe(200);
	});
	it("should delete an item from their id", async () => {
		const id = "0";
		const response = await request(server).delete(`/api/${id}`);
		expect(response.body).toBe(id);
	});
});