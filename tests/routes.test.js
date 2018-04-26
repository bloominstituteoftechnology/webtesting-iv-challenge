const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

mongoose.connect("mongodb://localhost/test", {}, err => {
    if (err) console.log(err);
    console.log(`\n=== Connected to mongo test ===\n`);
});

const expect = chai.expect;
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHTTP);

//schema
const Band = require("../models/bands");

describe("Bands", () => {
    beforeEach(done => {
        const bandOne = new Band({
            name: "Bill Withers",
            genre: "Funk",
            tourStatus: false,
        });
        bandOne.save((err, savedBand) => {
            if (err) {
                done(err);
            }
        });
        const bandTwo = new Band({
            name: "Fleet Foxes",
            genre: "Alt",
            tourStatus: true,
        });
        bandTwo.save((err, savedBand) => {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    afterEach(done => {
        Band.remove({}, err => {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    describe(`[GET] /api/bands`, () => {
        it("should get a list of all bands in the database", done => {
            chai
                .request(server)
                .get("/api/bands")
                .end((err, response) => {
                    // console.log("+++", response.body[0]._id);
                    if (err) {
                        return done(err);
                    }
                    expect(response.status).to.equal(200);
                    done();
                });
        });
    });

    describe(`[GET] /api/bands`, () => {
        it("should return an array of bands", done => {
            chai
                .request(server)
                .get("/api/bands")
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }
                    assert.isArray(response.body);
                    done();
                });
        });
    });

    describe(`[GET] /api/bands`, () => {
        it("should return properties _id, name, genre, tourStatus", done => {
            chai
                .request(server)
                .get("/api/bands")
                .end((err, response) => {
                    // console.log("+++", response.body[0]._id);
                    if (err) {
                        return done(err);
                    }
                    assert.exists(response.body[0].name, "name");
                    assert.exists(response.body[0].genre, "genre");
                    assert.exists(response.body[0].tourStatus, "tourStatus");
                    assert.exists(response.body[0]._id, "_id");
                    done();
                });
        });
    });
});
