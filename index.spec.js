const server = require("./api/server.js");
const request = require("supertest");

describe("GET /", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/");
		expect(response.status).toBe(200);
	});
});
describe("POST /api/:book", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/api/:book");
		expect(response.status).toBe(200);
	});
	it("should create a new book", async () => {
		const book = "Of Mice and Men";
		const response = await request(server).post(`/api/${book}`);
		const expected = { book: "Of Mice and Men" };
		expect(response.body).toEqual(expected);
	});
});
describe("DELETE /api/:id", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/api/:id");
		expect(response.status).toBe(200);
	});
});
