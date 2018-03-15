const mongoose = require("mongoose");

const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");

const User = require("./users");

describe("Users", () => {
  before(done => {
    mongoose.connect("mongodb://localhost/test");
    const db = mongoose.connection;
    db.on("error", () => {
      console.error("Wow! Really? What an idiot. WRONG!");
    });
    db.once("open", () => {
      console.log("It's connected like a bawwss");
      done();
    });
  });
  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
  describe("getUser", () => {
    it("should return the expected user name", () => {
      const user = new User({
        name: "Benjammin",
        location: "Pluto"
      });
      expect(user.getUser()).to.equal("Benjammin");
    });
  });
  describe("getAllUsers", () => {
    it("should return all the users...you get a user...YOU GET A USER...WE ALL GET USERS!", () => {
      sinon.stub(User, "find");
      User.find.yields(null, [
        {
          name: "Clara superGrumpyCat",
          location: "Claraville, Venus -> Population: Clara + random grumpy cat"
        },
        { name: "Troy the Great Mentor", location: "Honolulu, Mars" }
      ]);
      User.getAllUsers(users => {
        expect(users.length).to.equal(2);
        expect(users[0].name).to.equal("Clara superGrumpyCat");
        User.find.restore();
      });
    });
  });
});
