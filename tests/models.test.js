const mongoose = require("mongoose");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const Bee = require("../models/BeeModel");

describe("Bee", () => {
  let beeId;
  before(done => {
    mongoose.connect("mongodb://localhost/test", {}, err => {
      if (err) return console.log(err);
      console.log("TEST DB Connection Achieved");
    });
    done();
  });

  after(done => {
    console.log(mongoose.connection);
    mongoose.connection.close(err => {
      if (err) {
        return console.log(err);
      }
      done();
    });
  });
  describe("getBreed", () => {
    it("should return the breed of the bee", done => {
      const bee = new Bee({ breed: "Rainbow", honey: "colorful" });
      expect(bee.getBreed()).to.equal("Rainbow");
      done();
    });
  });
});
