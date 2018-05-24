const request = require("supertest");
const server = require("./server");
const mongoose = require("mongoose");
const User = require("../Users/User");

describe("server", () => {
	beforeAll(() => {
		return mongoose
			.connect("mongodb://localhost/testing-users")
			.then(console.log("connected to test db"));
	});

	afterEach(() => {
		return User.remove();
	});

	afterAll(() => {
		return mongoose.disconnect();
	});

	it("should return Ok and a json object from the index route", async () => {
		const expectedBody = { api: "running!" };

		const response = await request(server).get("/");

		expect(response.status).toEqual(200);
		expect(response.type).toEqual("application/json");
		expect(response.body).toEqual(expectedBody);
	});

	it("it should return status code 201 and json user object from the api users route", async () => {
		const expectedBody = { username: "frodo", password: "mordor" };

		const response = await request(server)
			.post("/api/users")
			.send(expectedBody);

		expect(response.status).toEqual(201);
		expect(response.type).toEqual("application/json");
		expect(response.body.username).toEqual(expectedBody.username);
	});
});
