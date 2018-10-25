const server = require("./api/server.js");
const request = require("supertest");

describe("GET /", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/");
		expect(response.status).toBe(200);
	});
	// it("should return the books", ()=>{

	//     const response = await request(server).get('/api/books');
	//     expect(response.body).toBe()
	// })
});
describe("POST /api/:book", () => {
	it("should create a new book", async () => {
		const book = "Of Mice and Men";
		const response = await request(server).post(`/api/${book}`);
		const expected = "Of Mice and Men";
		expect(response.body).toEqual(expected);
	});
	it("should return status 201", async () => {
		const book = "Ender's Game";
		const response = await request(server).post(`/api/${book}`);
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
