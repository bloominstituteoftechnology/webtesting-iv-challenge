const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
const User = require("./models");

const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");

describe("Users", () => {
  describe("#getUserEmail", () => {
    it("should give back the proper user.userEmail", done => {
      const user = new User({
        userEmail: "appleJacks@cereal.com",
        password: "spoiledmilk"
      });
      expect(user.getUserEmail()).to.equal("appleJacks@cereal.com");
      done();
    });
  });

  describe("#getAllUsers", () => {
    it("should return all the users", () => {
      sinon.stub(User, "find");
      User.find.yields(null, [
        { userEmail: "yasin@shuman.com", password: "gizmo" },
        { userEmail: "awni@shuman.com", password: "awno" }
      ]);
      User.getAllUsers(returnObject => {
        expect(returnObject.length).to.equal(2);
        expect(returnObject[0].userEmail).to.equal("yasin@shuman.com");
        User.find.restore();
      });
    });
  });
});
