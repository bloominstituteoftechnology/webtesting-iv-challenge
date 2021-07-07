const puppiesDb = require("./puppyBreeds.js");
const db = require("../data/dbConfig.js");
describe("puppy breeds", () => {
  describe("insert()", () => {
    afterEach(async () => {
      await db("puppies").truncate();
    });

    it("should insert the provided puppy into the db", async () => {
      await puppiesDb.insert({ name: "Shiba" });
      await puppiesDb.insert({ name: "Shepard" });

      const puppies = await db("puppies");
      expect(puppies).toHaveLength(5);
    });

    it("should insert the provided puppy into the db", async () => {
      let puppies = await puppiesDb.insert({ name: "Husky" });
      expect(puppy.name).toBe("Husky");

      puppy = await puppiesDb.insert({ name: "Corgi" });
      expect(puppy.name).toBe("Corgi");
    });
  });
});
