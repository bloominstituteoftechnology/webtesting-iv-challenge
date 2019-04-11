const request = require("supertest");
const server = require("./server");
const db = require("./data/config");

describe("Server Testing", () => {
  it("Should res 200 with a welcome messaging on GET /", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Welcome, please refer to the GitHub docs to get started."
    });
  });
});

describe("Database Testing", () => {
  beforeEach(async () => {
    await db("smurfs").truncate();
  });
  describe("Smurf CRUD Operation Testing", () => {
    it("Should create a smurf and return the newly created smurf object and then delete the new smurf", async () => {
      const smurf = {
        name: "Billy"
      };
      //Create the Smurf and make sure it is returned properly
      const firstRes = await request(server)
        .post("/smurfs")
        .send(smurf);
      expect(firstRes.status).toBe(200);
      expect(firstRes.type).toBe("application/json");
      expect(firstRes.body.name).toBe("Billy");

      //Remove the smurf that was previously created
      const secondRes = await request(server).delete(
        `/smurfs/firstRes.body.id`
      );
      expect(secondRes.status).toBe(200);
    });
  });
});
