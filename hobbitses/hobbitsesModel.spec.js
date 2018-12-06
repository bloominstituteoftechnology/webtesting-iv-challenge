const db = require("../data/dbConfig");
const hobbitses = require("./hobbitsesModel");
const request = require("supertest");
const routes = require("./hobbitsesRoutes");

beforeEach(async () => {
  await db("hobbitses").truncate();
});

describe("hobbitses model", () => {
  it("should insert a passed hobbit", async () => {
    let rows = await db("hobbitses").where({
      name: "Samwise"
    });
    expect(rows).toHaveLength(0);

    await hobbitses.insert({ name: "Samwise" });
    await hobbitses.insert({ name: "Frodo" });
    rows = await db("hobbitses").where({ name: "Samwise" });
    expect(rows).toHaveLength(1);
    rows = await db("hobbitses");
    expect(rows).toHaveLength(2);
  });

  it("should return a 201 code if successful", async () => {
    await request(routes)
      .post("/hobbitses")
      .send({ name: "Merry" })
      .expect(201);
  });
});
