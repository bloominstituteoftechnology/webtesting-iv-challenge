const db = require("../data/dbConfig");
const hobbitses = require("./hobbitsesModel");

beforeEach(async () => {
  await db("hobbitses").truncate();
});

describe("hobbitses model", () => {
  it("should insert a passed hobbit", async () => {
    let rows = await db("hobbitses").where({
      name: "Samwise"
    });
    expect(rows).toHaveLength(0);

    // await hobbitses.insert({})
  });
});
