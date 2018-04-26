const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

const expect = chai.expect;
const server = require("../server");
const Bee = require("../models/BeeModel");

// mongoose.connect("mongodb://localhost/test", {}, err => {
//   if (err) return console.log(err);
//   console.log("\n=== Connect to TEST database === \n");
// });

chai.use(chaiHTTP);

describe("Bees", () => {
  before(done => {
    mongoose.connect("mongodb://localhost/test", {}, err => {
      if (err) return console.log(err);
      console.log("TEST DB Connection Achieved");
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });
  let beeId;
  beforeEach(done => {
    const newBee = new Bee({
      breed: "Italian",
      honey: "Very High"
    });
    newBee.save((err, savedBee) => {
      if (err) {
        console.log(err);
        done();
      }
      beeId = savedBee._id;
      done();
    });
  });

  afterEach(done => {
    Bee.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/bees`, () => {
    it("should return a list of bee breeds", done => {
      chai
        .request(server)
        .get("/api/bees")
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          let test = [
            {
              _id: `${beeId}`,
              breed: "Italian",
              honey: "Very High",
              __v: 0
            }
          ];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("array");
          expect(response.body).to.deep.equal(test);
          return done();
        });
    });
  });
  describe(`[POST] /api/bees`, () => {
    let bee = { breed: "German", honey: "OK" };
    it("should add a bee to the database and return a list of bees", done => {
      chai
        .request(server)
        .post("/api/bees")
        .send(bee)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an("array");
          expect(response.body).to.have.length(2);
          expect(response.body[0].breed).to.equal("Italian");
          expect(response.body[1].breed).to.equal("German");
          expect(response.body[0].honey).to.equal("Very High");
          expect(response.body[1].honey).to.equal("OK");
          return done();
        });
    });
  });
  describe(`[PUT] /api/bees/id`, () => {
    let updatedBee = { breed: "German", honey: "OK" };
    it("should return a status of 200", done => {
      chai
        .request(server)
        .put(`/api/bees/${beeId}`)
        .send(updatedBee)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          expect(response.body.breed).to.equal("German");
          expect(response.body.honey).to.equal("OK");
          return done();
        });
    });
  });
  describe(`[DELETE] /api/bees/id`, () => {
    it("should return a status of 200", done => {
      chai
        .request(server)
        .delete(`/api/bees/${beeId}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          expect(response.body.breed).to.equal("Italian");
          expect(response.body.honey).to.equal("Very High");

          return done();
        });
    });
  });
});
