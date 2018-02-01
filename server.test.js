const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
const User = require("./models");
const server = require("./server");

const chai = require("chai");
const chaiHTTP = require("chai-http");
const { expect } = chai;
const sinon = require("sinon");
chai.use(chaiHTTP);

describe("User Server", () => {
  describe("[POST] /api/user/create", () => {
    it("should add a new user", () => {
      const newUser = {
        userEmail: "jack@jump.com",
        userPassword: "lotawords"
      };
      chai
        .request(server)
        .post("/api/user/create")
        .send(newUser)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.userEmail).to.equal("jack@jump.com");
        });
    });
  });
});
