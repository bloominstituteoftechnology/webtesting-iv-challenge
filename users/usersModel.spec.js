const users = require("./usersModel");
const db = require("../data/dbConfig.js");

afterEach(async () => {
    await db("users").truncate();
  });

describe("the users model", () => {
  
  it("should retrieve users", async () => {
    const rows = await users.fetch();
    expect(rows).toEqual([]);
  });
  it("should insert a user", async () => {
    const ids = await users.insert({ name: 'Martha' });

       expect(ids.length).toBe(1);
       expect(ids[0]).toBe(1);
  })
  it("should delete a user", async () => {
    const ids = await users.insert({ name: 'Martha' });
    const count = await users.remove(1);

    expect(count).toBe(1);
  })
});
