const server = require("./server.js");

const request = require("supertest");

describe("server", () => {
	describe("smurfs", () => {
		it("returns true if post succeeds", async () => {
			const response = await request(server)
				.post("/smurfs")
				.send({ name: "laruen smurf", role: "jerkface" });

			expect(response.body).toEqual({
				id: 1,
				name: "laruen smurf",
				role: "jerkface",
			});
		});
		it("returns true if post deletes", async () => {
			const post = await request(server)
				.post("/smurfs")
				.send({ name: "laruen smurf", role: "jerkface" });

			const response = await request(server)
				.delete("/smurfs")
				.send({ id: 1 });
			expect(response.body).toEqual({
				error: false,
				id: 1,
				message: "Lauren smurf ded",
			});
		});
	});
});
