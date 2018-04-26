const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

const expect = chai.expect;
const assert = chai.assert;
const server = require("../server");
//schema
const Band = require("../models/bands");

chai.use(chaiHTTP);

// MAKE SURE TO SET UP MG IN BEFORE AND AFTER
describe("Bands", () => {
    let bandId = [];
    before(done => {
        mongoose.connect("mongodb://localhost/test", {}, err => {
            if (err) console.log(err);
            console.log(`\n=== Connected to mongo test ===\n`);
        });
        done();
    });

    after(done => {
        mongoose.connection.close();
        done();
    });

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
            bandId.push(savedBand._id.toString());
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
            bandId.push(savedBand._id.toString());
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
                    assert.isArray(response.body);
                    assert.exists(response.body[0].name, "name");
                    assert.exists(response.body[0].genre, "genre");
                    assert.exists(response.body[0].tourStatus, "tourStatus");
                    assert.exists(response.body[0]._id, "_id");
                    done();
                });
        });
    });

    describe(`[GET] /api/bands/:id`, () => {
        it("should get the band with matching ID", done => {
            const id = bandId[0];
            chai
                .request(server)
                .get(`/api/bands/${id}`)
                // .query({ params: id })
                .then(response => {
                    console.log("+++", response.body);
                    // expect(bandId[0]).to.equal(response.body._id);
                })
                .catch(err => {
                    console.log(err);
                });
            done();
        });
    });
});

// GET by ID
// PUT
// POST
/*
.request(server)
.post(/api/bands)
.send({//object that you want to create})
.ebd((err, response) => {console.log(response)})
*/

// TEST ERR after completed with above
/*
it('should fail if bad name, tour status, or genre), done => {
    chai
    .request(server)
    .post(/api/)
    .send({})
    .then
    .catch 
}
*/
