const helpers = require("./index");
const db = require("../dbConfig");

describe("helper db methods", () => {
  afterEach(async () => {
    await db("users").truncate();
  });

  it("should create a new user", async () => {
    const ids = await helpers.insert({ username: "johnny" });

    expect(ids.length).toBe(1);
    expect(ids[0]).toBe(1);
  });
});
