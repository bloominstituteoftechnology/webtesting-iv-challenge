const chai = require("chai");
const mongoose = require("mongoose");
const chaiHTTP = require("chai-http");
const server = require("./server");
chai.use(chaiHTTP);

mongoose.connect("mongodb://localhost/testTest", {}, err => {
  if (err) return console.log(err);
  console.log("Mongo Connection Success");
});

const Dog = require("./Dog");
const expect = chai.expect;

describe("Dogs", () => {
  let dogId;
  beforeEach(done => {
    const newDog = new Dog({
      name: "Charles",
      breed: "Mastiff"
    });
    newDog
      .save((err,savedDog) => {
          if(err) {
              console.log(err);
              done();
          }
        dogId = savedDog._id;
        done();
      })
  });

  afterEach(done => {
      Dog.remove({}, err => {
          if (err) console.log(err);
          return done();
      });
  });

  describe("GET to /api/dogs", () => {
    it("should get a list of dog breeds", done => {
      chai
        .request(server)
        .get('/api/dogs')
        .end((err, response) => {
            if (err) {
                console.log(err);
                return done();
            }
            expect(response.status).to.equal(200);
            return done();
        })
    });
  });


describe('POST to /api/dogPost', () => {
    it('should add a new dog to DB', done => {
        Dog.find({})
        chai
            .request(server)
            .post('/api/dogPost')
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                // console.log(response);
                expect(response.status).to.equal(201);
                return done();
            })
    })
})


});
