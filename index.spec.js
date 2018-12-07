const request = require("supertest");

const server = require("./api/server");

const db = require("./data/dbConfig");

//clears table and resets id counter before each test
beforeEach(async () => {
  await db("characters").truncate();
});

describe("server.js", () => {
  describe("/", () => {
    it("should keep me sane by returning a 200 code", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/");

      expect(response.type).toBe("application/json");
    });

    it('should return with a body of {api: "running"}', async () => {
      let response = await request(server).get("/");
      expect(response.body).toEqual({ api: "running" });
    });
  });

  describe("/scrubs POST route", () => {
    it("successfully adds a new scrubs character to the db", async () => {
      let rows = await db("characters").where({ name: "JD" });
      // first prove it doesn't have the specified characters
      expect(rows).toHaveLength(0);

      // insert a record
      await db("characters").insert({ name: "JD" });
      rows = await db("characters").where({ name: "JD" });
      expect(rows).toHaveLength(1);

      await db("characters").insert({ name: "Turk" });
      rows = await db("characters");
      expect(rows).toHaveLength(2);
    });

    it("returns status 201 upon successful creation", async () => {
      let response = await request(server)
        .post("/scrubs")
        .send({ name: "Bob Kelso" });
      expect(response.status).toBe(201);
      let rows = await db("characters").where({ name: "Bob Kelso" });
      expect(rows.length).toBe(1);
    });
  });

  describe("/scrubs/:id DELETE route", () => {
    it("successfully deletes a specified scrubs character from the db", async () => {
      //since we're truncating all tables before tests run, first insert a new character

      await db("characters").insert({ name: "Turkleton" });
      let rows = await db("characters");
      expect(rows).toHaveLength(1);
      await db("characters")
        .where({ id: 1 })
        .del();
      rows = await db("characters");
      expect(rows).toHaveLength(0);
    });

    it("returns 200 status upon successful deletion", async () => {
      await db("characters").insert({ name: "Turkleton" });
      let rows = await db("characters");
      expect(rows).toHaveLength(1);
      let response = await request(server).delete("/scrubs/1");
      expect(response.status).toBe(200);
    });
  });
});
