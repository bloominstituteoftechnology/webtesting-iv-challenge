const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

const expect = chai.expect;
const server = require("../server");
const Bee = require("../models/BeeModel");

mongoose.connect("mongodb://localhost/test", {}, err => {
  if (err) return console.log(err);
  console.log("\n=== Connect to TEST database === \n");
});

chai.use(chaiHTTP);

describe("Bees", () => {
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

  // afterEach(done => {
  //   Bee.remove({}, err => {
  //     if (err) console.log(err);
  //     return done();
  //   });
  // });

  describe(`[GET] /api/bees`, () => {
    it("should return a status of 200", done => {
      chai
        .request(server)
        .get("/api/bees")
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
    });
    it("should return a list of bee breeds", done => {
      chai
        .request(server)
        .get("/api/bees")
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          // console.log(response);
          expect(response.data).to.equal([
            {
              breed: "Italian",
              honey: "Very High"
            }
          ]);
          done();
        });
    });
  });
  describe(`[POST] /api/bees`, () => {
    let bee = { breed: "German", honey: "OK" };
    it("should return a status of 201", done => {
      chai
        .request(server)
        .post("/api/bees")
        .send(JSON.stringify(bee))
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(201);
          return done();
        });
    });
  });
  describe(`[PUT] /api/bees/id`, () => {
    let updatedBee = { breed: "German", honey: "OK" };
    it("should return a status of 200", done => {
      chai
        .request(server)
        .put("/api/bees/${beeId}")
        .send(JSON.stringify(updatedBee))
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
    });
  });
  describe(`[DELETE] /api/bees/id`, () => {
    it("should return a status of 200", done => {
      chai
        .request(server)
        .delete("/api/bees/${beeId}")
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
    });
  });
});
