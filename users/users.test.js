const users = require("./users.js");
const db = require("../data/dbConfig.js");

describe("the user table", () => {
   it("should insert new users", async () => {
      const ids = await users.insert({name: "mike"});
      expect(ids.length).toBe(1);
      expect(id[0]).toBe(1);
   });
});